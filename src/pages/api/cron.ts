//app/api/cronNew.ts
import { PostNoticias } from "@/actions/postActions";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiRequest, NextApiResponse } from "next";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDxUtirxFw02eGbtD6I1gd_lGnp98d_7pI");

// function parsearTexto(texto: string) {
//   const secciones = texto.split("**Título:**");
//   const titulo = secciones[1].split("**Subtítulo:**")[0].trim();
//   const subtitulo = secciones[1].split("**Subtítulo:**")[1].split("**Lead:**")[0].trim();
//   const lead = secciones[1].split("**Lead:**")[1].split("**Cuerpo:**")[0].trim();
//   const cuerpo = secciones[1].split("**Cuerpo:**")[1].split("**Extra:**")[0].trim();
//   const extra = secciones[1].split("**Extra:**")[1].trim();

//   return {
//     titulo,
//     subtitulo,
//     lead,
//     cuerpo,
//     extra
//   };
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    (in spanish,but the imagen prompt in English) You're an experienced news editor responsible for creating engaging and humorous fake news stories for a fictional newspaper. Your specialty lies in crafting attention-grabbing headlines, intriguing leads, and entertaining content that keeps readers entertained. Your task is to develop a fake and humorous news article for our fictional newspaper. Here are the details you need to include:
    - Headline: ________
    - Subheadline: ________
    - Lead: ________
    - Body: ________
    - Humorous Touch: ________
    Ensure that the article is lighthearted, funny, and creatively written to spark joy in the readers. Once you've generated the news article, also provide a prompt for generating an image related to the main theme of the story. Make sure to follow the same structure for both the news article and the image prompt to maintain consistency and ensure a high level of creativity and humor in both outputs.`;

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