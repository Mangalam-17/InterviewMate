const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) =>
  `Generate ${numberOfQuestions} technical interview questions for a ${role} with ${experience} years of experience.

ROLE: ${role}
EXPERIENCE: ${experience} years
FOCUS TOPICS: ${topicsToFocus}
NUMBER OF QUESTIONS: ${numberOfQuestions}

INSTRUCTIONS:
- Create practical, role-specific questions
- Questions should match the experience level
- Focus on the specified topics
- Provide detailed, beginner-friendly answers
- Include relevant code examples when applicable
- Ensure answers are comprehensive but concise
- Questions should test both theoretical knowledge and practical skills

OUTPUT FORMAT:
Return ONLY a JSON array with this exact structure:
[
  {
    "question": "Clear, specific question here?",
    "answer": "Comprehensive answer with explanations and code examples if relevant."
  }
]

CRITICAL:
- Output must be pure, valid JSON
- No additional text, markdown, or explanations
- No code blocks around the JSON
- No trailing commas
- Ensure proper JSON syntax

Example of valid output:
[
  {
    "question": "What is dependency injection?",
    "answer": "Dependency injection is a design pattern that allows for loose coupling between components. Instead of a class creating its own dependencies, they are injected from the outside. This makes code more testable and maintainable."
  }
]`;

const conceptExplainPrompt = (question) =>
  `Explain the following technical interview question in depth:

QUESTION: "${question}"

INSTRUCTIONS:
- Create a short, descriptive title that summarizes the core concept
- Provide a comprehensive explanation suitable for a beginner developer
- Break down complex concepts into simple terms
- Include practical examples and real-world applications
- Add code snippets where relevant to illustrate points
- Cover both theoretical understanding and practical implementation
- Explain why this concept is important in software development

OUTPUT FORMAT:
Return ONLY a JSON object with this exact structure:
{
  "title": "Clear, concise title summarizing the concept",
  "explanation": "Detailed explanation with examples, code snippets, and practical insights."
}

CRITICAL:
- Output must be pure, valid JSON
- No additional text, markdown, or explanations outside the JSON
- No code blocks around the JSON
- Ensure proper JSON escaping for special characters
- Title should be under 10 words
- Explanation should be comprehensive but well-structured

Example of valid output:
{
  "title": "Understanding React Component Lifecycle",
  "explanation": "React components have a lifecycle with three main phases: mounting, updating, and unmounting. Each phase has specific methods that get called, allowing developers to hook into different moments of a component's existence."
}`;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };
