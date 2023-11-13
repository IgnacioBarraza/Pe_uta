import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHome, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const iconSize = "xl";

  return (
    <>
      <div className="navbar flex justify-around">
        <div className="left-container flex">
          <div className="flex items-center logo-container">
            <img
              src="src/assets/uta_logo.svg"
              alt="UTA logo"
              className="uta-logo"
            />
          </div>
          <div className="nav-btns flex items-center lg:ml-10 ml-6">
            <Link to={'/home'}>
            <button className="nav-btn flex items-center justify-center">
              <FontAwesomeIcon icon={faHome} size={iconSize} />
              <span className="font-bold text-lg lg:ml-3 ml-1">Inicio</span>
            </button>
            </Link>
            <Link to={'/projects'}>
            <button className="nav-btn ml-1 lg:ml-2 flex items-center justify-center">
              <FontAwesomeIcon icon={faBookmark} size={iconSize} />
              <span className="font-bold text-lg lg:ml-3 ml-1">Proyectos</span>
            </button>
            </Link>
            <Link to={'/evaluated'}>
            <button className="nav-btn ml-1 lg:ml-2 flex items-center justify-center">
              <FontAwesomeIcon icon={faSquareCheck} size={iconSize} />
              <span className="font-bold text-lg lg:ml-3 ml-1">Evaluados</span>
            </button>
            </Link>
          </div>
        </div>
        <div className="center-container flex justify-center">
          <div className="title-text text-black pt-2 pl-5 pr-5 flex items-center justify-center">
            <span>Feria de ciencias “Triunfando en el conocimiento”</span>
            <span>Universidad de Tarapacá</span>
          </div>
        </div>
        <div className="right-container flex justify-end">
          <button>
            <FontAwesomeIcon icon={faRightToBracket} size={iconSize}/>
          </button>
        </div>
      </div>
    </>
  );
}
