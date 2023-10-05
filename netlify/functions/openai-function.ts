// netlify/functions/openaiFunction.js
// import axios from 'axios';
import type { Handler } from "@netlify/functions";
const handler: Handler = async () => {

  // your server-side functionality
  // const x = event.queryStringParameters;
  // const body = event.body;
  try {
    // Your OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    const requestData = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'what are the numbers between 6 and 10?' },
      ],
      max_tokens:30
    };
    // Define your OpenAI API request
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      return data.choices[0].message.content;
    })
    .catch(error => {
      return console.error(error);
    });

    return {
      statusCode: 200,
      body: response 
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'nope, internal server error' }),
    };
  }
};

export { handler };
