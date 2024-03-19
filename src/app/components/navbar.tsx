'use client'
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import run from "@/pages/api/cron";


export default function App() {
  const handleRun = async () => {
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
      </NavbarContent>
    </Navbar>
  );
}
