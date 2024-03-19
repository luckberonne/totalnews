import React from "react";
import { Card, CardBody, Tooltip } from "@nextui-org/react";
import { FaInfoCircle } from "react-icons/fa";


export default function Footer() {
  return (
    <Card>
      <CardBody>
        <div className="flex">Aviso: Todas las noticias son generadas por inteligencia artificial.
        <p className="ml-3"></p>
          <Tooltip size={"sm"} showArrow={true} placement="right" offset={25} content="Solo un recordatorio: todas nuestras noticias son cortesía de la inteligencia artificial. 🤖✨

          ¡Gracias por su comprensión y por visitarnos!">
            <FaInfoCircle />
          </Tooltip>
        </div>
      </CardBody>
    </Card>
  );
}
