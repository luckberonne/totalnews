import React from "react";
import { GetNoticia } from "@/actions/getActions";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import { Noticias } from "@prisma/client";

export default async function App({ params }: { params: { viewNoticia: string } }) {
  const noticia: Noticias | null= await GetNoticia(parseInt(params.viewNoticia));
  
  return (
    <Card className="my-4">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-2xl">{noticia!.titulo}</p>
          <p className="text-small text-default-500">{noticia!.subtitulo}</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody className="text-start text-xl gap-4">
        <p>{noticia!.lead}</p>
        <p>{noticia!.cuerpo}</p>
      </CardBody>
      <Divider/>
      <CardFooter className="text-xl">
        {noticia!.extra}
      </CardFooter>
    </Card>
  );
}
