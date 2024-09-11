import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function Navbar() {

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
        <Sheet>
          <SheetTrigger asChild aria-describedby="Navigation menu">
            <Button variant="outline" size="icon" className="lg:hidden">
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <VisuallyHidden>
              <DialogTitle>Navigation Menu</DialogTitle>
            </VisuallyHidden>
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
              <a href="/login" className="text-sm font-medium hover:underline underline-offset-4">
                Iniciar Sesión
              </a>
              <a href="/register" className="text-sm font-medium hover:underline underline-offset-4">
                Registrarse
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <a href={"/"} className="hidden sm:flex items-center justify-center" >
          <span className="text-xl font-bold">Feria de Ciencia</span>
        </a>
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
          <a href="/login" className="text-sm font-medium hover:underline underline-offset-4">
            Iniciar Sesión
          </a>
          <a href="/register" className="text-sm font-medium hover:underline underline-offset-4">
            Registrarse
          </a>
        </div>
      </header>
  );
}
