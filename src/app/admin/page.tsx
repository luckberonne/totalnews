'use client'
// import run from "@/pages/api/cron";
import { Button } from "@nextui-org/react";

export default function Admin() {
    const handleRun = async () => {
        try {
            // await run();
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
