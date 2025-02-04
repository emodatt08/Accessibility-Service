import { AppDataSource } from '../config/database';
import { AccessibilityIssue } from '../models/AccessibilityIssue';
import { AccessibilityResult } from '../models/AccessibilityResult';
import { analyzeHtmlContent } from '../utils/htmlAnalyzer';
import { readFile } from 'fs/promises';
import { enhanceHtmlWithOpenAI } from './openai.service';

/**
 * Analyze the uploaded HTML file for accessibility issues.
 * Compares found issues with known rules in the database, calculates a compliance score,
 * stores the result, and returns the analysis.
 * Additionally, calls OpenAI's API to produce a fixed HTML structure and recommendations.
 *
 * @param filePath - Path to the uploaded HTML file.
 * @returns The saved result along with OpenAI analysis.
 */
export const analyzeAccessibility = async (filePath: string) => {
  // Read file content.
  const htmlContent = await readFile(filePath, { encoding: 'utf-8' });

  // Perform rule-based analysis.
  const foundIssues = analyzeHtmlContent(htmlContent);

  // Fetch known accessibility issues from the database.
  const issueRepository = AppDataSource.getRepository(AccessibilityIssue);
  const knownIssues = await issueRepository.find();

  // Map found issues to include descriptions and suggested fixes from known issues.
  const issuesWithFixes = foundIssues.map(found => {
    const known = knownIssues.find(k => k.ruleName === found.ruleName);
    return {
      ruleName: found.ruleName,
      description: known ? known.description : found.details,
      suggestedFix: known ? known.suggestedFix : 'Please review the issue.',
    };
  });

  // Calculate a simple compliance score.
  // For demo: compliance = 100 - (number_of_issues * 10), with a minimum of 0.
  const complianceScore = Math.max(100 - issuesWithFixes.length * 10, 0);

  // Store the result in the database.
  const resultRepository = AppDataSource.getRepository(AccessibilityResult);
  const result = resultRepository.create({
    complianceScore,
    issues: issuesWithFixes,
  });
  const savedResult = await resultRepository.save(result);

  // --- Call OpenAI to enhance the HTML ---
  const openAIResult = await enhanceHtmlWithOpenAI(htmlContent);

  // Return a combined result including the OpenAI analysis.
  return { 
    ...savedResult,
    openAI: openAIResult
  };
};
