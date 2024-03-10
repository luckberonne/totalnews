import React from "react";
import { Card, CardBody, Image } from "@nextui-org/react";
import { list } from "postcss";
import New from "./new";
import FastNew from "./fastNews";

export default function NewsRightSide() {
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
    ];
  return (
    <div className="mt-4">
      {list.map((item, index) => (
        <FastNew key={index}/>
      ))}
    </div>
  );
}
