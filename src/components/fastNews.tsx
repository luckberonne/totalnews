import React from "react";
import { Card, CardBody, Image } from "@nextui-org/react";

export default function FastNew() {
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-full max-h-[200px] mb-4"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover"
              height={100}
              shadow="md"
              src="https://th.bing.com/th?id=ORMS.f6b7130a5bdd580f31c5dcf47160b557&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1.25&p=0"
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <h1 className="text-2xl font-bold mb-4">Mini Noticia</h1>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
