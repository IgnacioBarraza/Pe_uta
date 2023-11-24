import "./modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

export default function Modal({ show, close, name }) {
  const upperCaseName = name.toUpperCase();

  return (
    <>
      {show ? (
        <div
          className="modalContainer"
          role="dialog"
          aria-label="Mensaje de Confirmación"
        >
          <div
            className="modal"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <header className="modal_header">
              <h2 id="modal-title" className="modal_header-title">
                Hola {upperCaseName}
              </h2>
              <button
                className="close"
                onClick={() => close()}
                aria-label="Cerrar Modal"
              >
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            </header>
            <main
              className="modal_content flex flex-col"
              id="modal-description"
            >
              <span className="text-base mb-2">
                Ya estás registrado para poder evaluar los proyectos que se
                exponen en esta feria de ciencias.
              </span>
              <span className="text-base mb-2">
                Consideraciones a tener en cuenta:
              </span>
              <ol className="text-sm mb-2">
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
                <button className="modal-close">Continuar</button>
              </Link>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
}
