// netlify/functions/openaiFunction.js
import axios from 'axios';

exports.handler = async function (event, context) {
  try {
    // Your OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;

    // Define your OpenAI API request
    const response = await axios.post(
      'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions',
      {
        prompt: 'Translate the following English text to French: "Hello, world!"',
        max_tokens: 50,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
