'use client'
import React, { useState } from "react";
import { Card, CardBody, Image, Skeleton } from "@nextui-org/react";


interface Props {
  titulo: string | null;
}

const FastNew: React.FC<Props> = ({ titulo }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered ? (
        <Skeleton className="absolute top-0 left-0 w-full h-full rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
      ) : null}
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-full max-h-[200px] mb-4"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="flex flex-col col-span-6 md:col-span-8">
            <h1 className={`text-md font-bold ${!isHovered ? 'invisible' : ''}`}>{titulo}</h1>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default FastNew;