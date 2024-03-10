import React from "react";
import { ScrollShadow } from "@nextui-org/react";
import New from "./new";

export default function NewsLeftSide() {
  const list: NewModel[] = [
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
        {list.map((item, index) => (
          <New key={index} item={item} />
        ))}
      </div>

    </ScrollShadow>

  );
}
