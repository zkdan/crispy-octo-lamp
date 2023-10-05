// netlify/functions/openaiFunction.js
import axios from 'axios';
import type { Handler, HandlerEvent } from "@netlify/functions";
const handler: Handler = async (event: HandlerEvent) => {

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
    const res = await axios({
      method: 'POST',
      url:'https://api.openai.com/v1/chat/completions',
      data: JSON.stringify(requestData),
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      return response.data.choices[0].message.content
    })
    .catch(error => {
       return JSON.stringify({ error: `This issue: ${error}` })
    });
    return {
      statusCode:200,
      body:res,
      eventData: event
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'nope, internal server error' }),
    };
  }
};

export { handler };
