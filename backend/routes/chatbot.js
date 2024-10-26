const express = require('express');
const { SessionsClient } = require('@google-cloud/dialogflow');
const uuid = require('uuid');
require("dotenv").config();

// Initialize the router
const router = express.Router();

// Initialize Dialogflow client
const sessionClient = new SessionsClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

async function detectIntentText(projectId, sessionId, text, languageCode) {
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    // The Dialogflow request
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: text,
                languageCode: languageCode,
            },
        },
    };

    // Send request and get response from Dialogflow
    const responses = await sessionClient.detectIntent(request);
    return responses[0].queryResult.fulfillmentText;
}

// Define the chat route
router.post('/chat', async (req, res) => {
    const { message, session_id } = req.body;
    const sessionId = session_id || uuid.v4(); // Use provided session_id or create a new one

    try {
        // Process the message with Dialogflow
        const responseText = await detectIntentText(process.env.GOOGLE_PROJECT_ID, sessionId, message, 'en');

        // Send back the response as JSON
        res.json({ response: responseText });
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
