//app/api/cronNew.ts
import { PostNoticias } from "@/actions/postActions";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';


// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDxUtirxFw02eGbtD6I1gd_lGnp98d_7pI");

interface Noticia {
  titulo: string
  subtitulo: string
  lead: string
  cuerpo: string
  extra: string
}

function separarTexto(texto: string): Noticia {
  const partes = texto.split('\n\n'); // Separar por párrafos
  const noticia: Noticia = {
      titulo: '',
      subtitulo: '',
      lead: '',
      cuerpo: '',
      extra: ''
  };

  partes.forEach((parte) => {
      if (parte.startsWith('**Titular:**') || parte.startsWith('**Headline:**') || parte.startsWith('**Title:**') || parte.startsWith('**Título:**')) {
          noticia.titulo = parte.substring(parte.indexOf(':') + 4).trim();
      } else if (parte.startsWith('**Subtítulo:**') || parte.startsWith('**Subtitle:**')) {
          noticia.subtitulo = parte.substring(parte.indexOf(':') + 4).trim();
      } else if (parte.startsWith('**Entrada:**') || parte.startsWith('**Lead:**')) {
          noticia.lead = parte.substring(parte.indexOf(':') + 4).trim();
      } else if (parte.startsWith('**Cuerpo:**') || parte.startsWith('**Body:**')) {
          noticia.cuerpo = parte.substring(parte.indexOf(':') + 4).trim();
      } else if (parte.startsWith('**Extra:**') || parte.startsWith('**Adicional:**')) {
          noticia.extra = parte.substring(parte.indexOf(':') + 4).trim();
      }
  });
  return noticia;
}


export default async function run(){
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    (todo en espanol menos los tags) As an imaginative journalist for a quirky and fictional newspaper, your forte lies in creating hilarious and entertaining fake news stories that captivate readers with their creativity and humor. Your task is to craft a funny and absurd news piece for our newspaper. Here are the details you need to include:
    - *Headline*: [Blank]
    - *Subtitle*: [Blank]
    - *Lead*: [Blank]
    - *Body*: [Blank]
    - *Extra*: [Blank]
    - *Image Prompt*: [Blank]
    Your goal is to maintain a consistent structure for the news article with a touch of humor in every section. Ensure the headline is attention-grabbing, the lead captures the essence of the story, and the body elaborates on the details in a comical and engaging manner. Add a quirky twist at the end to leave the readers amused. Remember to keep the tone light-hearted and the content witty throughout the article.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const noticia = separarTexto(text);
    await PostNoticias(noticia)
    console.log({
			data: `Updated new: ${noticia.titulo}`
		});
    return NextResponse.json({
			data: `Updated new: ${noticia.titulo}`
		});
  }
  catch (error: any) {
		console.log({ error });
		return NextResponse.json({
			error: error.message,
		});
  }
}