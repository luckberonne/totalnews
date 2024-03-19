//app/api/cronNew.ts
import { PostNoticias } from "@/actions/postActions";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';
import { text } from "stream/consumers";


// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDxUtirxFw02eGbtD6I1gd_lGnp98d_7pI");

interface Noticia {
  titulo: string
  subtitulo: string
  lead: string
  cuerpo: string
  extra: string
}

export default async function run(){
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Eres un maestro de las trivialidades al que le encanta impresionar a la gente con datos extravagantes e interesantes, ya sean falsos o erróneos. Tu especialidad radica en elaborar frases cortas y cautivadoras que dejen asombrado a tu audiencia.
    Genera un hecho intrigante en una sola frase.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // await PostNoticias(noticia)
    console.log({
			data: `Updated new: ${text}`
		});
    return NextResponse.json({
			data: `Updated new: ${text}`
		});
  }
  catch (error: any) {
		console.log({ error });
		return NextResponse.json({
			error: error.message,
		});
  }
}