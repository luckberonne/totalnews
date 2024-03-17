'use client'
import { Button } from "@nextui-org/react";
import { run } from "../api/cron/cronNew"; // Asegúrate de que esta ruta sea la correcta

export default function Admin() {
    const handleRun = async () => {
        try {
            await run();
            console.log("Function run() executed successfully.");
        } catch (error) {
            console.error("Error executing function run():", error);
        }
    };

    return (
        <div>
            <Button onClick={handleRun}>Run Function</Button>
        </div>
    );
}
