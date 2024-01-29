import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function generateSpeculation(input: string) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "I am an AI that speculate with and philosophical tone",
        },
        {
          role: "user",
          content: `Make a speculation having as a starting point: ##${input}##. Don't start in the same way. The speculation should be in a single sentence with no more than 20 words.`,
        },
      ],
    });
    const data = await response.json();
    const specutation = data.choices[0].message.content;
    return specutation as string;
  } catch (error) {
    throw error;
  }
}

export async function generateLandscape(specutation: string) {
  try {
    const response = await openai.createImage({
      prompt: `generate an image that ilustrates the following text: ##${specutation}##.`,
      n: 1,
      size: "256x256",
    });

    const data = await response.json();
    const image_url = data.data[0].url;
    return image_url as string;
  } catch (error) {
    console.error(error);
  }
}
