import React from "react";
import { Card, CardBody, Divider } from "@nextui-org/react";

export default function ExpressNews() {
    return (
        <Card>
            <CardBody>
                <div className="flex h-5 items-center space-x-4 text-small">
                    <div>Dolar Hoy: $400.</div>
                    <Divider orientation="vertical" />
                    <div>Alberto Fernandez quiere volver al poder con un ejercito de monos entrenados.</div>
                </div>
            </CardBody>
        </Card>
    );
}
