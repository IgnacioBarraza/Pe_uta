import "./modal.css";
import { Link } from "react-router-dom";

export default function Modal({ show, close, name }) {
  return (
    <>
      {show ? (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50"
          role="dialog"
          aria-label="Mensaje de Confirmación"
        >
          <div
            className="bg-[#f0f0f0] rounded-lg p-5 w-[700px]"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <header className="flex justify-between items-center mb-4">
              <h2 id="modal-title" className="text-2xl text-black">
                Hola {name}!
              </h2>
            </header>
            <main
              className="modal_content flex flex-col"
              id="modal-description"
            >
              <span className="text-base lg:text-lg mb-2">
                Ya estás registrado para poder evaluar los proyectos que se
                exponen en esta feria de ciencias.
              </span>
              <span className="text-base lg:text-lg mb-2">
                Consideraciones a tener en cuenta:
              </span>
              <ol className="text-sm lg:text-base mb-2">
                <li>
                  Para una próxima vez, debes ingresar con la misma clave que
                  utilizaste al iniciar sesión.
                </li>
                <li>
                  Debes ingresar con tu RUT, el formato es sin puntos y con
                  guión.
                </li>
                <li>Trata de no olvidar tu contraseña.</li>
              </ol>
            </main>
            <footer className="modal_footer flex justify-center">
              <Link to={"/home"}>
                <button className="bg-davy-gray hover:bg-dark-gray text-white border-none cursor-pointer rounded-lg w-32 h-12">Continuar</button>
              </Link>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
}
