import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import TaskRun from "@/actions/task/taskRun";
import { useRouter } from "next/navigation";

export default function ModalNew() {
  const router = useRouter()

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [data, setData] = useState<{ id: number; titulo: string | null; lead: string | null }>({
    id: 0,
    titulo: null,
    lead: null,
  });

  const handleRun = async () => {
    try {
      const data = await TaskRun();
      console.log(data);
      setData(data);
      console.log("Function run() executed successfully.");
      onOpen(); // Open the modal
    } catch (error) {
      console.error("Error executing function run():", error);
    }
  };

  
  return (
    <>
      <Button onPress={handleRun}>Generar Noticia</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Nueva Noticia Generada</ModalHeader>
              <ModalBody>
                <p> 
                  {data.titulo}
                </p>
                <p>
                  {data.lead}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => {router.push(data.id.toString()), onOpenChange()}}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
