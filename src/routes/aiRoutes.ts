// routes/aiRoutes.js (හෝ aiRoutes.ts ඔයා CommonJS පාවිච්චි කරනවා නම්)
const { Router } = require('express');
const { GoogleGenAI } = require('@google/genai');

const router = Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ success: false, message: "Message is required" });
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: message,
            config: {
                systemInstruction: "You are an AI assistant for 'E-Book Sky Store', a premium digital bookstore. Keep answers helpful and friendly."
            }
        });

        res.json({ success: true, reply: response.text });
    } catch (error) {
        console.error("Gemini AI Error:", error);
        res.status(500).json({ success: false, message: "AI Server Error" });
    }
});

module.exports = router; // 👈 module.exports වලින්ම export කරන්න