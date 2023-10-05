// netlify/functions/openaiFunction.js
import axios from 'axios';
import type { Handler } from "@netlify/functions";
import OpenAI from "openai";
const openai = new OpenAI();
async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });
  console.log('main')
  console.log(completion.choices[0]);
}


const handler: Handler = async () => {

  // your server-side functionality
  // const x = event.queryStringParameters;
  // const body = event.body;
  try {
    // Your OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    main();
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
      body: response.data
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'nope, internal server error' }),
    };
  }
};

export { handler };
