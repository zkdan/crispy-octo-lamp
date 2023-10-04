// netlify/functions/openaiFunction.js
import axios from 'axios';

import type { Handler, HandlerEvent } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent) => {
  // your server-side functionality
  const x = event.queryStringParameters;
  const body = event.body;
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
      info:x,
      info2: body
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

export { handler };
