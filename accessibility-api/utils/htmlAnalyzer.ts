import * as cheerio from 'cheerio';

interface AnalyzedIssue {
  ruleName: string;
  details: string;
}

/**
 * Analyze HTML content for accessibility issues.
 * Returns an array of found issues.
 */
export const analyzeHtmlContent = (html: string): AnalyzedIssue[] => {
  const issuesFound: AnalyzedIssue[] = [];
  const $ = cheerio.load(html);

  // ----- Rule 1: Check for images without an alt attribute -----
  $('img').each((index, img) => {
    if (!$(img).attr('alt')) {
      issuesFound.push({
        ruleName: 'Missing Alt Attribute',
        details: 'An image tag is missing an alt attribute.',
      });
    }
  });

  // ----- Rule 2: Check for heading order issues -----
  // Get all heading elements (h1 to h6) in the order they appear.
  const headings = $('h1, h2, h3, h4, h5, h6').toArray();
  if (headings.length > 0) {
    // Check the first heading: It should be <h1>.
    const firstHeading = headings[0];
    if (firstHeading.type === 'tag' && typeof (firstHeading as any).name === 'string') {
      const tag = ((firstHeading as any).name as string).toLowerCase();
      const level = parseInt(tag.substring(1), 10);
      if (level !== 1) {
        issuesFound.push({
          ruleName: 'Skipped Heading Levels',
          details: `The first heading should be <h1> but found <${tag}>.`,
        });
      }
    }

    // Check for skipped levels in the remaining headings.
    // Start with the level of the first heading (or assume 1 if missing).
    let previousLevel: number = 1;
    headings.forEach((elem, index) => {
      if (elem.type === 'tag' && typeof (elem as any).name === 'string') {
        const tag = ((elem as any).name as string).toLowerCase();
        const level = parseInt(tag.substring(1), 10);
        if (index > 0) {
          // If the current heading level is more than one level higher than the previous heading,
          // flag it as a skipped level.
          if (level > previousLevel + 1) {
            issuesFound.push({
              ruleName: 'Skipped Heading Levels',
              details: `Heading level skipped from h${previousLevel} to <${tag}>.`,
            });
          }
          previousLevel = level;
        } else {
          // For the first heading, update the previous level for subsequent checks.
          previousLevel = level;
        }
      }
    });
  }

  return issuesFound;
};
