const { GoogleGenAI } = require("@google/genai");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
} = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Helper function to call AI with retry logic
const callAIWithRetry = async (prompt, maxRetries = 3) => {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: prompt,
      });

      // Extract text from response (fixed structure)
      const rawText = response.candidates[0].content.parts[0].text;

      // Clean the response
      const cleanedText = rawText
        .replace(/^```json\s*/, "")
        .replace(/```$/, "")
        .trim();

      return JSON.parse(cleanedText);
    } catch (error) {
      lastError = error;

      // If it's a rate limit error, wait and retry
      if (
        error.message.includes("429") ||
        error.message.includes("RESOURCE_EXHAUSTED")
      ) {
        const waitTime = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
        console.log(
          `⚠️ Rate limited. Attempt ${attempt + 1}/${maxRetries}. Waiting ${waitTime}ms...`
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue; // Try again
      } else {
        // Other errors - break immediately
        throw error;
      }
    }
  }

  // If we exhausted all retries
  throw lastError;
};

// Helper function for mock data
const getMockQuestions = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) => {
  return Array.from({ length: numberOfQuestions || 5 }, (_, i) => ({
    question: `Mock question ${i + 1} about ${topicsToFocus} for ${role} role?`,
    answer: `This is a mock answer while we handle rate limits. A real AI response would provide detailed technical explanations for ${role} with ${experience} years experience focusing on ${topicsToFocus}.`,
  }));
};

const getMockExplanation = (question) => ({
  title: `Understanding: ${question.substring(0, 50)}...`,
  explanation: `**Concept Explanation**\n\nThis is a mock explanation for: "${question}"\n\nThe AI service is currently rate limited. In a real scenario, you would get a detailed technical explanation with code examples and best practices.\n\n*Using mock data for development.*`,
});

// @desc    Generate interview questions and answers using Gemini
// @route   POST /api/ai/generate-questions
// @access  Private
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    console.log("🔄 Generating interview questions...");

    // Use the retry helper
    const data = await callAIWithRetry(prompt);

    console.log("✅ Successfully generated questions");
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ AI Error in generateInterviewQuestions:", error);

    // 🔥 RETURN MOCK DATA WHEN RATE LIMITED
    if (
      error.message.includes("429") ||
      error.message.includes("RESOURCE_EXHAUSTED")
    ) {
      console.log("📦 Using mock questions data due to rate limits");
      const mockData = getMockQuestions(
        req.body.role,
        req.body.experience,
        req.body.topicsToFocus,
        req.body.numberOfQuestions
      );
      return res.status(200).json(mockData);
    }

    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

// @desc    Generating explanation to a interview question
// @route   POST /api/ai/generate-explanation
// @access  Private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing question" });
    }

    const prompt = conceptExplainPrompt(question);

    console.log("🔄 Generating concept explanation...");

    // Use the retry helper
    const data = await callAIWithRetry(prompt);

    console.log("✅ Successfully generated explanation");
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ AI Error in generateConceptExplanation:", error);

    // 🔥 RETURN MOCK DATA WHEN RATE LIMITED
    if (
      error.message.includes("429") ||
      error.message.includes("RESOURCE_EXHAUSTED")
    ) {
      console.log("📦 Using mock explanation data due to rate limits");
      const mockData = getMockExplanation(req.body.question);
      return res.status(200).json(mockData);
    }

    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };
