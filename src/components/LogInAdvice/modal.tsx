import "./modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

export default function Modal({ show, close, name }) {
  const upperCaseName = name.toUpperCase();

  return (
    <>
      {show ? (
        <div className="modalContainer">
          <div className="modal">
            <header className="modal_header">
              <h2 className="modal_header-title">Hola {upperCaseName}</h2>
              <button className="close" onClick={() => close()}>
                <FontAwesomeIcon icon={faXmarkCircle} />
              </button>
            </header>
            <main className="modal_content flex flex-col">
              <span className="text-base mb-2">
                Ya estas registrado para poder evaluar los proyectos que se
                exponen en esta feria de ciencias
              </span>
              <span className="text-base mb-2">Cosas a tener en cuenta:</span>
              <li className="text-sm mb-2">
                Para una proxima vez debes ingresar con la misma clave que
                ingresaste cuando iniciaste sesión
              </li>
              <li className="text-sm mb-2">
                Debes ingresar con tu rut, el formato es sin puntos y con guión
              </li>
              <li className="text-sm mb-2">
                Trata de no olvidar tu contraseña
              </li>
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
