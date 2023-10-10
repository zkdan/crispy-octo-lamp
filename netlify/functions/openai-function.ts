// netlify/functions/openaiFunction.js
import axios from 'axios';
import type { Handler, HandlerEvent } from "@netlify/functions";
const handler: Handler = async (event: HandlerEvent) => {
  const query = event.queryStringParameters?.question || 'Where will I find the answer?';
  try {
    // Your OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    const requestData = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `You are Chinese poet and philospher Lao Tzu.` },
        { role: 'user', content: query },
      ],
      max_tokens:80
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
      return response.data.choices[0].message.content || {message:'some issue!'}
    })
    .catch(error => {
       return JSON.stringify({ error: `This issue: ${error}` })
    });
    return {
      statusCode:200,
      body:res
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'nope, internal server error' }),
    };
  }
};

export { handler };
