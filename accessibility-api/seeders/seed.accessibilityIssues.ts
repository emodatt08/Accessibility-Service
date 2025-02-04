import { AppDataSource } from '../config/database';
import { AccessibilityIssue } from '../models/AccessibilityIssue';

export const seedAccessibilityIssues = async () => {
  const issueRepository = AppDataSource.getRepository(AccessibilityIssue);

  // Define a list of 40 known accessibility issues
  const issues = [
    {
      ruleName: 'Missing Alt Attribute',
      description: 'Images should have an alt attribute for accessibility.',
      suggestedFix: 'Add an alt attribute describing the image content.',
    },
    {
      ruleName: 'Skipped Heading Levels',
      description: 'Headings should be used sequentially to maintain hierarchy.',
      suggestedFix: 'Ensure heading tags (h1-h6) are used in sequential order.',
    },
    {
      ruleName: 'Insufficient Color Contrast',
      description: 'Text and interactive elements should have sufficient color contrast.',
      suggestedFix: 'Adjust colors to meet WCAG contrast ratio guidelines.',
    },
    {
      ruleName: 'Missing Form Labels',
      description: 'Form elements should have associated labels for better accessibility.',
      suggestedFix: 'Provide descriptive labels for all form controls.',
    },
    {
      ruleName: 'Unclear Focus Indicator',
      description: 'Interactive elements should have a clear focus state for keyboard users.',
      suggestedFix: 'Enhance the focus styles to make them more visible.',
    },
    {
      ruleName: 'Non-Semantic Navigation',
      description: 'Navigation should be built using semantic HTML elements.',
      suggestedFix: 'Wrap navigation links in a <nav> element.',
    },
    {
      ruleName: 'Missing ARIA Roles',
      description: 'Interactive elements may require ARIA roles for accessibility.',
      suggestedFix: 'Add appropriate ARIA roles to custom components.',
    },
    {
      ruleName: 'Redundant Links',
      description: 'Multiple links to the same destination can be confusing.',
      suggestedFix: 'Ensure each link has a unique purpose or destination.',
    },
    {
      ruleName: 'Improper Use of Landmarks',
      description: 'ARIA landmarks help navigation but must be used correctly.',
      suggestedFix: 'Apply landmark roles only where they add value.',
    },
    {
      ruleName: 'Keyboard Navigation Issues',
      description: 'All interactive elements should be accessible via keyboard.',
      suggestedFix: 'Ensure proper tab order and keyboard event handlers.',
    },
    {
      ruleName: 'Lack of Skip Navigation',
      description: 'Users should be able to skip repetitive content.',
      suggestedFix: 'Include a “Skip to main content” link at the top of the page.',
    },
    {
      ruleName: 'Non-Descriptive Link Text',
      description: 'Link text should clearly indicate its destination or action.',
      suggestedFix: 'Replace generic texts like "click here" with descriptive text.',
    },
    {
      ruleName: 'Inadequate Error Identification',
      description: 'Form errors should be clearly identified and described.',
      suggestedFix: 'Implement clear error messages and ARIA attributes for errors.',
    },
    {
      ruleName: 'Missing Captions for Videos',
      description: 'Videos should provide captions or transcripts for accessibility.',
      suggestedFix: 'Add subtitles or transcripts to video content.',
    },
    {
      ruleName: 'Time-Based Media Controls',
      description: 'Users should control time-based media (e.g., pause or adjust playback).',
      suggestedFix: 'Provide accessible media controls for time-based content.',
    },
    {
      ruleName: 'Inconsistent Navigation',
      description: 'Navigation should remain consistent across pages.',
      suggestedFix: 'Standardize navigation components across the site.',
    },
    {
      ruleName: 'Dynamic Content Not Announced',
      description: 'Dynamic updates should be announced to assistive technologies.',
      suggestedFix: 'Use ARIA live regions to announce dynamic content changes.',
    },
    {
      ruleName: 'Unlabeled Buttons',
      description: 'Buttons must have an accessible name or label.',
      suggestedFix: 'Add descriptive text or aria-label attributes to buttons.',
    },
    {
      ruleName: 'Missing Document Language',
      description: 'The document should declare its language in the HTML tag.',
      suggestedFix: 'Add a lang attribute (e.g., <html lang="en">) to your HTML.',
    },
    {
      ruleName: 'Non-Responsive Design',
      description: 'Content should be accessible on all devices and screen sizes.',
      suggestedFix: 'Utilize responsive design techniques and media queries.',
    },
    {
      ruleName: 'Disorganized Focus Order',
      description: 'Focus order should follow the visual layout logically.',
      suggestedFix: 'Ensure a natural and predictable tab order for interactive elements.',
    },
    {
      ruleName: 'Missing Skip Links for Repeated Content',
      description: 'Repeated content should be skippable for screen reader users.',
      suggestedFix: 'Include skip links to bypass repetitive navigation or content.',
    },
    {
      ruleName: 'Insufficient Touch Target Size',
      description: 'Interactive elements must be large enough for easy tapping on touch screens.',
      suggestedFix: 'Increase the size of touch targets to at least 44x44 pixels.',
    },
    {
      ruleName: 'Misleading Iconography',
      description: 'Icons should be accompanied by text to convey their meaning.',
      suggestedFix: 'Include descriptive text or aria-labels alongside icons.',
    },
    {
      ruleName: 'Content Not Scalable',
      description: 'Users should be able to resize text without breaking the layout.',
      suggestedFix: 'Ensure layouts accommodate text scaling up to 200%.',
    },
    {
      ruleName: 'Overuse of Animations',
      description: 'Excessive animations can distract or cause discomfort for users.',
      suggestedFix: 'Reduce animations or offer an option to disable them.',
    },
    {
      ruleName: 'Poorly Defined Interactive Areas',
      description: 'Interactive regions should be clearly defined and separated.',
      suggestedFix: 'Use visual cues and adequate spacing for interactive elements.',
    },
    {
      ruleName: 'Missing ARIA Labels for Complex Widgets',
      description: 'Complex UI components need proper ARIA labeling for accessibility.',
      suggestedFix: 'Add appropriate ARIA labels and roles to complex widgets.',
    },
    {
      ruleName: 'Use of Deprecated HTML Elements',
      description: 'Deprecated elements may not be accessible or supported.',
      suggestedFix: 'Replace deprecated elements with modern, semantic alternatives.',
    },
    {
      ruleName: 'Inaccessible Screen Reader Experience',
      description: 'Screen reader users may struggle with poorly structured content.',
      suggestedFix: 'Test with screen readers and adjust the content structure accordingly.',
    },
    {
      ruleName: 'Low Contrast on Form Fields',
      description: 'Form fields should have sufficient contrast to be legible.',
      suggestedFix: 'Adjust form field colors to improve contrast.',
    },
    {
      ruleName: 'Missing Accessible Names for Inputs',
      description: 'Inputs must have an accessible name for identification.',
      suggestedFix: 'Provide aria-labels or associate inputs with labels.',
    },
    {
      ruleName: 'Ambiguous Interactive Elements',
      description: 'Interactive elements must clearly communicate their function.',
      suggestedFix: 'Clarify button labels and interactive cues to reduce ambiguity.',
    },
    {
      ruleName: 'Ineffective Skip Navigation Placement',
      description: 'Skip navigation links must be easily noticeable and accessible.',
      suggestedFix: 'Place skip navigation links at the top of the page.',
    },
    {
      ruleName: 'Over-Reliance on Color',
      description: 'Information should not be conveyed solely by color.',
      suggestedFix: 'Use text labels or patterns in addition to color cues.',
    },
    {
      ruleName: 'Inaccessible Data Tables',
      description: 'Data tables need proper structure for accessibility.',
      suggestedFix: 'Use <th> elements, captions, and summaries for data tables.',
    },
    {
      ruleName: 'Missing Alternative Text for Icons',
      description: 'Icons require alternative text for screen reader accessibility.',
      suggestedFix: 'Add aria-label or alt attributes to icon images.',
    },
    {
      ruleName: 'Misconfigured ARIA Live Regions',
      description: 'ARIA live regions must be properly configured to announce changes.',
      suggestedFix: 'Ensure that live regions have the correct ARIA attributes.',
    },
    {
      ruleName: 'Custom Controls Lack Keyboard Support',
      description: 'Custom control elements should be fully keyboard accessible.',
      suggestedFix: 'Implement proper keyboard event handling and focus management.',
    },
    {
      ruleName: 'Missing Section Headings',
      description: 'Sections should be identified with headings to improve navigation.',
      suggestedFix: 'Include headings that describe each major section of the page.',
    },
    {
      ruleName: 'Redundant Form Instructions',
      description: 'Form instructions should be clear and not unnecessarily repeated.',
      suggestedFix: 'Consolidate and simplify form instructions.',
    },
    {
      ruleName: 'Complex Navigation Menus',
      description: 'Complex menus can hinder navigation for assistive technology users.',
      suggestedFix: 'Simplify menus or provide additional navigational aids.',
    },
    {
      ruleName: 'Lack of Visible Focus Styles',
      description: 'Focus styles must be visible to assist keyboard navigation.',
      suggestedFix: 'Enhance focus indicators for interactive elements.',
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
