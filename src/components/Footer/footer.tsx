// Footer.tsx
import packageJson from "../../../package.json"; // Ruta hacia el package.json

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t justify-between">
      <p className="text-xs text-muted-foreground">
        &copy; 2024 Feria de Ciencia. Todos los derechos reservados.
      </p>
      <p className="text-xs text-muted-foreground">
        {packageJson.version} {/* Aquí se muestra la versión */}
      </p>
    </footer>
  );
}
