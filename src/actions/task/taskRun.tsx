'use server'
//app/api/cronNew.ts
import { PostNoticias } from "@/actions/postActions";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { env } from "process";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(env.GEN_IA_API!);

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
  console.log(texto);
  return noticia;
}


export default async function TaskRun(){
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ];
    
      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
          {
            role: "user",
            parts: [{ text: "(todo en espanol menos los tags) As an imaginative journalist for a quirky and fictional newspaper, your forte lies in creating hilarious and entertaining fake news stories that captivate readers with their creativity and humor. Your task is to craft a funny and absurd news piece for our newspaper. Here are the details you need to include:    - *Headline*: [Blank]    - *Subtitle*: [Blank]    - *Lead*: [Blank]    - *Body*: [Blank]    - *Extra*: [Blank]    - *Image Prompt*: [Blank]    Your goal is to maintain a consistent structure for the news article with a touch of humor in every section. Ensure the headline is attention-grabbing, the lead captures the essence of the story, and the body elaborates on the details in a comical and engaging manner. Add a quirky twist at the end to leave the readers amused. Remember to keep the tone light-hearted and the content witty throughout the article."}],
          },
          {
            role: "model",
            parts: [{ text: "**Titular:** ¡Alerta de \"Pico de loro\"!\n\n**Subtitular:** Aves exóticas amenazan con sobrepoblar la ciudad\n\n**Entrada:** \"¡Socorro! La ciudad se está volviendo un nido gigante de loros. Estos pájaros exóticos, conocidos por sus chillidos agudos y su tendencia a masticar lo que encuentran a su paso, están invadiendo nuestros hogares, parques y hasta las oficinas gubernamentales.\n\n**Cuerpo:** Los expertos señalan que la culpa la tiene un enjambre de loros escapados de un zoológico local. Desde entonces, se han reproducido a un ritmo alarmante, transformando la ciudad en una cacofonía de graznidos.\n\nLos habitantes están desesperados. Los vecinos se quejan de que los loros les roban la comida de sus platos, mientras que los oficinistas luchan por concentrarse entre el constante parloteo. Un caso particularmente preocupante es el de un alcalde que quedó atrapado en su propio ayuntamiento durante horas, asediado por una bandada de loros que exigían cacahuetes.\n\n**Extra:** La situación se ha vuelto tan grave que la ciudad ha contratado a un \"cazador de loros\" especial, el señor Silvestre Sánchez. Armado con un silbato y una red gigante, el señor Sánchez se dedica a perseguir a los pájaros con la intención de recapturarlos. Sin embargo, hasta ahora, sus esfuerzos han resultado inútiles. Los loros, más astutos que él, lo esquivan hábilmente, burlándose de sus intentos.\n\n**Imagen de incitación:** Una fotografía de un loro encaramado descaradamente en la cabeza del alcalde, mientras este intenta desesperadamente quitárselo de encima."}],
          },
          {
            role: "user",
            parts: [{ text: "Otra noticia siempre siguiendo el mismo formato"}],
          },
          {
            role: "model",
            parts: [{ text: "**Titular:** ¡El monstruo del espagueti volador desciende sobre la ciudad!\n\n**Subtitular:** Pastafari piden reconocimiento oficial\n\n**Entrada:** ¡Prepárense para lo insólito! El tan esperado monstruo del espagueti volador ha hecho su aparición en nuestra ciudad. Esta deidad pastafari, con su cuerpo hecho de espagueti y sus albóndigas como ojos, ha causado un gran revuelo entre los creyentes y los escépticos por igual.\n\n**Cuerpo:** Los seguidores del pastafarismo, conocidos por su amor a la pasta y su sentido del humor irreverente, han acudido en masa a las calles para celebrar la llegada de su deidad. Vestidos con coladores en la cabeza (que, según ellos, son sombreros religiosos), cantan himnos sobre la bondad de los tallarines y la santidad de la salsa de tomate.\n\nLas autoridades locales están desconcertadas por la situación. Un portavoz del ayuntamiento declaró: \"No estamos seguros de qué hacer. ¿Debemos tratar esto como un fenómeno religioso o como una especie de broma elaborada?\".\n\nMientras tanto, los pastafaris aprovechan su momento de fama para exigir el reconocimiento oficial de su religión. Piden que se les permita llevar coladores en sus fotos de carnet y que se instale una estatua del monstruo del espagueti volador en el ayuntamiento.\n\n**Extra:** Se rumorea que el monstruo del espagueti volador tiene un apetito voraz por los espaguetis con albóndigas. Algunos ciudadanos preocupados han comenzado a esconder sus reservas de pasta por temor a que la deidad hambrienta se la coma.\n\n**Imagen de incitación:** Una foto del monstruo del espagueti volador flotando sobre la ciudad, con un tenedor y un plato de espaguetis en sus \"manos\"."}],
          }
        ],
      });
    // const prompt = `
    // (todo en espanol menos los tags) As an imaginative journalist for a quirky and fictional newspaper, your forte lies in creating hilarious and entertaining fake news stories that captivate readers with their creativity and humor. Your task is to craft a funny and absurd news piece for our newspaper. Here are the details you need to include:
    // - *Headline*: [Blank]
    // - *Subtitle*: [Blank]
    // - *Lead*: [Blank]
    // - *Body*: [Blank]
    // - *Extra*: [Blank]
    // - *Image Prompt*: [Blank]
    // Your goal is to maintain a consistent structure for the news article with a touch of humor in every section. Ensure the headline is attention-grabbing, the lead captures the essence of the story, and the body elaborates on the details in a comical and engaging manner. Add a quirky twist at the end to leave the readers amused. Remember to keep the tone light-hearted and the content witty throughout the article.`;
    
    // const result = await model.generateContent(prompt);
    const result = await chat.sendMessage("otra noticia");
    const response = await result.response;
    const text = response.text();
    const noticia = separarTexto(text);
    return await PostNoticias(noticia);
}