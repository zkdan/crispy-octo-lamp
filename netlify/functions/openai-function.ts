// netlify/functions/openaiFunction.js
import axios from 'axios';
import type { Handler } from "@netlify/functions";
const handler: Handler = async () => {

  // your server-side functionality
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
    axios({
      method: 'POST',
      url:'https://api.openai.com/v1/chat/completions',
      data: JSON.stringify(requestData),
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })
    // .then(response => response.json())
    .then(data => {
      return {
        statusCode: 200,
        body: data.data.choices[0].message.content 
      };
    })
    .catch(error => {
      return {
        statusCode:200,
        body: console.error(error)
      }
    });
 
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'nope, internal server error' }),
    };
  }
};

export { handler };
