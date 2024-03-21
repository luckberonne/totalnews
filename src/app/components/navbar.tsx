'use client'
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Modal } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import run from "@/pages/api/cron";
import ModalNew from "../components/modalNew";



export default function App() {
  const handleRun = async () => {
    try {
      await run();
      console.log("Function run() executed successfully.");
    } catch (error) {
      console.error("Error executing function run():", error);
    }
  };
  const handleMiniRun = async () => {
    try {
      await run();
      console.log("Function run() executed successfully.");
    } catch (error) {
      console.error("Error executing function run():", error);
    }
  };
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <Link href="/noticias">
          <AcmeLogo />
          <p className="font-bold text-inherit text-xl" >TotalNews</p>
        </Link>
      </NavbarBrand>
      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent> */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" onClick={handleRun}>
            Generar Noticia
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="secondary" onClick={handleMiniRun}>
            Generar MiniNoticia
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ModalNew />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
