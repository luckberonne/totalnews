//app/api/cronNew.ts
import { PostNoticias } from "@/actions/postActions";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiRequest, NextApiResponse } from "next";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDxUtirxFw02eGbtD6I1gd_lGnp98d_7pI");


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    As an imaginative journalist for a quirky and fictional newspaper, your forte lies in creating hilarious and entertaining fake news stories that captivate readers with their creativity and humor. Your task is to craft a funny and absurd news piece for our newspaper. Here are the details you need to include:
    - *Headline*: [Blank](this in spanish)
    - *Subtitle*: [Blank](this in spanish)
    - *Lead*: [Blank](this in spanish)
    - *Body*: [Blank](this in spanish)
    - *Extra*: [Blank](this in spanish)
    - *Image Prompt*: [Blank](this in english)
    Your goal is to maintain a consistent structure for the news article with a touch of humor in every section. Ensure the headline is attention-grabbing, the lead captures the essence of the story, and the body elaborates on the details in a comical and engaging manner. Add a quirky twist at the end to leave the readers amused. Remember to keep the tone light-hearted and the content witty throughout the article.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    // const noticia = parsearTexto(text);
    // await PostNoticias(noticia)
    res.send({message: "All message sent successfully."})
  }
  catch (error) {
    console.error("Error executing function run():", error);
  }
}