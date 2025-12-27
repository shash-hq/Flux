const { ChatOpenAI } = require("@langchain/openai");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

// Initialize LangChain with OpenAI (or others via env)
const chat = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY || "test-key", // Fallback for prototype
    temperature: 0.7,
});

const analyzeTrend = async (trendText) => {
    try {
        const messages = [
            new SystemMessage(
                "You are an expert technology analyst. Analyze the following tech news/trend."
            ),
            new HumanMessage(
                `Analyze this trend text: "${trendText}". 
        Return a JSON object with: 
        1. "summary": A concise 2-sentence summary.
        2. "sentiment": A score from -1.0 (negative) to 1.0 (positive).
        3. "hype_stage": One of ["Innovation Trigger", "Peak of Inflated Expectations", "Trough of Disillusionment", "Slope of Enlightenment", "Plateau of Productivity"].`
            ),
        ];

        const response = await chat.invoke(messages);

        // Parse JSON from the response text (simplistic handling for prototype)
        // In production, use structured output parsers
        const jsonMatch = response.content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        } else {
            throw new Error("Failed to parse AI response");
        }

    } catch (error) {
        console.error("AI Analysis Failed:", error);
        // Fallback for prototype if API fails or key is missing
        return {
            summary: "AI analysis unavailable - defaulting to raw text.",
            sentiment: 0.0,
            hype_stage: "Innovation Trigger"
        };
    }
};

module.exports = { analyzeTrend };
