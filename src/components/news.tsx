import React from "react";
import { Card, CardBody, Divider, Image } from "@nextui-org/react";
import NewsLeftSide from "./newsLeftSide";
import NewsRightSide from "./newsRightSide";

export default function News() {
  return (
    <div className="gap-8 grid grid-cols-4 mb-4">
      <div className="col-span-3">
        <NewsLeftSide />
      </div>
      <div className="col-span-1 items-end">
        <NewsRightSide />
      </div>
    </div>
  );
}
