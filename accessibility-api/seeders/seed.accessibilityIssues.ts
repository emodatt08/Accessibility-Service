import { AppDataSource } from '../config/database';
import { AccessibilityIssue } from '../models/AccessibilityIssue';

export const seedAccessibilityIssues = async () => {
  const issueRepository = AppDataSource.getRepository(AccessibilityIssue);

  // Define a list of known accessibility issues
  const issues = [
    {
      ruleName: 'Missing Alt Attribute',
      description: 'Images should have an alt attribute for accessibility.',
      suggestedFix: 'Add alt attribute describing the image content.',
    },
    {
      ruleName: 'Skipped Heading Levels',
      description: 'Headings should be used sequentially to maintain hierarchy.',
      suggestedFix: 'Ensure that heading tags (h1-h6) are used in a sequential order.',
    },

  ];

  // Save issues to the database (only if not already seeded)
  for (const issue of issues) {
    const exists = await issueRepository.findOneBy({ ruleName: issue.ruleName });
    if (!exists) {
      const newIssue = issueRepository.create(issue);
      await issueRepository.save(newIssue);
    }
  }

  console.log('Accessibility issues seeded successfully.');
};
