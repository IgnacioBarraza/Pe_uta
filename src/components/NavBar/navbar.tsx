/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

export default function Navbar() {

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <a href="/inicio" className="flex items-center justify-center" >
              <span className="text-xl font-bold">Feria de Ciencia</span>
            </a>
            <nav className="grid gap-4 sm:gap-6 py-6">
              <a href="/inicio" className="text-sm font-medium hover:underline underline-offset-4">
                Inicio
              </a>
              <a href="/inicio/proyectos" className="text-sm font-medium hover:underline underline-offset-4">
                Proyectos
              </a>
              <a href="/inicio/evaluar" className="text-sm font-medium hover:underline underline-offset-4">
                Evaluar
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="ml-auto hidden lg:flex gap-4 sm:gap-6">
          <a href="/inicio" className="text-sm font-medium hover:underline underline-offset-4">
            Inicio
          </a>
          <a href="/inicio/proyectos" className="text-sm font-medium hover:underline underline-offset-4">
            Proyectos
          </a>
          <a href="/inicio/evaluar" className="text-sm font-medium hover:underline underline-offset-4">
            Evaluar
          </a>
        </div>
      </header>
  );
}
