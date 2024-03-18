//app/api/cronNew.ts
import { PostNoticias } from "@/actions/postActions";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDxUtirxFw02eGbtD6I1gd_lGnp98d_7pI");

function parsearTexto(texto: string) {
  const secciones = texto.split("**Título:**");
  const titulo = secciones[1].split("**Subtítulo:**")[0].trim();
  const subtitulo = secciones[1].split("**Subtítulo:**")[1].split("**Lead:**")[0].trim();
  const lead = secciones[1].split("**Lead:**")[1].split("**Cuerpo:**")[0].trim();
  const cuerpo = secciones[1].split("**Cuerpo:**")[1].split("**Extra:**")[0].trim();
  const extra = secciones[1].split("**Extra:**")[1].trim();

  return {
    titulo,
    subtitulo,
    lead,
    cuerpo,
    extra
  };
}

export default async function run() {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
        Generar una noticia graciosa, creativa, original, humorística y falsa, con total libertad.
        ¡Bienvenido a la sección de noticias más divertida del día! Como experto en generar noticias humorísticas, mi objetivo es crear una historia ingeniosa y original que te haga reír.

        Instrucciones:
        La noticia debe tener la siguiente estructura: Título, Subtítulo, Lead, Cuerpo y Extra.

        Eres libre de elegir cualquier clase de noticia, ya sea farándula, ciencia, eventos famosos o curiosidades.

        Sé creativo y original en tu enfoque, pero recuerda que la noticia debe ser falsa y humorística.

        Contexto:
        Imagina que eres el redactor principal de un periódico ficticio llamado "El Juego de Palabras". Tu misión es entretener a los lectores con noticias inusuales y graciosas que los hagan sonreír.

        Detalles específicos:
        El título debe captar la atención del lector de inmediato y generar expectativa sobre el contenido humorístico.

        El subtítulo puede añadir un toque adicional de humor o preparar al lector para la historia que está por venir.

        El lead debe ser breve pero intrigante, atrayendo aún más a los lectores y animándolos a seguir leyendo.

        El cuerpo de la noticia debe desarrollar la historia, ofreciendo detalles humorísticos y situaciones extravagantes (debe largo).

        El extra puede ser una frase adicional al final de la noticia que añada un remate gracioso o una conclusión sorprendente.

        Resultado deseado:
        Esperamos que la noticia que generes sea una historia humorística, ingeniosa y completamente ficticia que haga reír a los lectores y les brinde un momento de diversión en medio de su día.

        Recuerda, ¡la creatividad y el humor son clave!`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const noticia = parsearTexto(text);
    await PostNoticias(noticia)
    return NextResponse.json({
      data: `Updated news: ${noticia.titulo}`
    });
  }
  catch (error) {
    console.error("Error executing function run():", error);
  }
}