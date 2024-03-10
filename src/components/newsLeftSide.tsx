import React from "react";
import { Card, CardBody, Image, ScrollShadow } from "@nextui-org/react";
import { list } from "postcss";
import New from "./new";

export default function NewsLeftSide() {
    const list = [
        {
          title: "Orange",
          img: "/images/fruit-1.jpeg",
          price: "$5.50",
        },
        {
          title: "Tangerine",
          img: "/images/fruit-2.jpeg",
          price: "$3.00",
        },
        {
            title: "Tangerine",
            img: "/images/fruit-2.jpeg",
            price: "$3.00",
          },
          {
            title: "Tangerine",
            img: "/images/fruit-2.jpeg",
            price: "$3.00",
          },
          {
            title: "Tangerine",
            img: "/images/fruit-2.jpeg",
            price: "$3.00",
          },
          {
            title: "Tangerine",
            img: "/images/fruit-2.jpeg",
            price: "$3.00",
          },
    ];
  return (
    <ScrollShadow hideScrollBar className=" h-[700px]">
        <div className="mt-4 gap-2 grid grid-cols-1">
        {list.map((item, index) => (
            <New/>
            ))}
        </div>

    </ScrollShadow>

  );
}
