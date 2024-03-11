import React from "react";
import { ScrollShadow } from "@nextui-org/react";
import New from "./new";
import { prisma } from "@/lib/prisma";

export default async function NewsLeftSide() {
  const noticias : Noticias[] = await prisma.noticias.findMany({
    take: 10,
    orderBy: {
      fecha_hora: 'desc'
    }
  });
  console.log(noticias);
  const list: Noticias[] = [
    {
      id: 1,
      titulo: "Sample Title",
      subtitulo: "Sample Subtitle",
      lead: "Sample Lead",
      cuerpo: "Sample Body",
      extra: "Sample Extra",
      autor: "Sample Author",
      fecha_hora: new Date()
    }
  ];

  return (
    <ScrollShadow hideScrollBar className=" h-[700px]">
      <div className="mt-4 gap-2 grid grid-cols-1">
        {noticias.map((item, index) => (
          <New key={index} item={item} />
        ))}
      </div>

    </ScrollShadow>

  );
}
