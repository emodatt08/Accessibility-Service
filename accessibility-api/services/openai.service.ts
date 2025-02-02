import OpenAi from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAi({
  apiKey: process.env.OPEN_AI_KEY,
});

/**
 * Given raw HTML, use OpenAI to produce a fixed HTML structure with accessibility improvements,
 * along with recommendations.
 *
 * The prompt instructs the model to respond in JSON format with keys:
 * - fixedHtml: the updated HTML structure.
 * - recommendations: textual recommendations.
 *
 * @param rawHtml - The raw HTML to be analyzed and fixed.
 * @returns An object with fixedHtml and recommendations.
 */
export const enhanceHtmlWithOpenAI = async (
  rawHtml: string
): Promise<{ fixedHtml: string; recommendations: string }> => {
  // Build the prompt.
  const prompt = `
You are an accessibility expert.
Analyze the following HTML for accessibility issues, then produce a revised HTML structure that fixes these issues.
Also, provide recommendations on how the HTML was improved.
Make sure to respond in JSON format like the below only

{
    "fixedHtml": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Faulty HTML Document</title>\n</head>\n<body>\n  <!-- Fixed the image by adding alt text -->\n  <img src=\"image.png\" alt=\"Description of the image\">\n\n  <!-- Corrected the heading order by placing the main title first -->\n  <h1>Main Title</h1>\n  <h2>Section Title</h2>\n  <p>This section should have started with an h1 tag.</p>\n  <h2>Sub Title</h2>\n</body>\n</html>",
    "recommendations": [
      "Added an alt attribute to the image tag to provide a text alternative for screen readers, improving image accessibility.",
      "Rearranged the headings to follow a correct logical order, starting with h1 for the main title followed by h2 for subsections. This helps with the semantic structure of the page and enhances navigation for assistive technologies.",
      "Ensured all headings are meaningful and contextually related, aiding in document organization and comprehension."
    ]
  }
HTML:
${rawHtml}
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "developer", content: prompt }],
      store: true,
    });
    // Access the message from the first choice.
    const choice = completion.choices[0].message;
    const text: string | undefined = choice?.content?.trim();
    if (!text) {
      throw new Error("No text returned from OpenAI");
    }

    // Parse the returned JSON string.
    const result = JSON.parse(text);

    // If recommendations are returned as an array, you might want to join them into a string.
    let recommendations: string = "";
    if (Array.isArray(result.recommendations)) {
      recommendations = result.recommendations.join("\n");
    } else {
      recommendations = result.recommendations || "";
    }

    // Return the parsed and formatted result.
    return {
      fixedHtml: result.fixedHtml || "",
      recommendations,
    };
  } catch (error) {
    console.error("Error during OpenAI analysis:", error);
    return {
      fixedHtml: rawHtml, // Fall back to original HTML.
      recommendations: "Unable to generate recommendations at this time.",
    };
  }
};
