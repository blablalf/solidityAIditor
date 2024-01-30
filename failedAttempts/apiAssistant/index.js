const express = require('express');
const multer = require('multer');
const axios = require('axios');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' }); // Setup for file handling

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;

app.use(express.json());

// Endpoint to handle requests
app.post('/ask', upload.array('files'), async (req, res) => {
    const { prompt } = req.body;

    // Log incoming prompt and files for debugging
    console.log('Received prompt:', prompt);
    console.log('Received files:', req.files);

    // Basic validation
    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required' });
    }

    try {
        const response = await axios.post(`https://api.openai.com/v1/assistants/${OPENAI_ASSISTANT_ID}/completions`, {
            prompt,
            max_tokens: 150,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        });

        // Send OpenAI's response back to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error calling OpenAI:', error);
        res.status(500).json({ message: 'Error processing your request with OpenAI' });
    }
});

// Fallback route for unmatched routes
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
