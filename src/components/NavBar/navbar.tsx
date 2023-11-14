import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHome,
  faRightToBracket,
  faBars
} from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useState } from "react";

export default function Navbar() {
  const iconSize = "xl";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="navbar flex justify-between items-center p-4">
        <div className="left-container flex items-center justify-center">
          <div className="nav-btns flex items-center">
            <button className="xl:hidden" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBars} size={iconSize} />
            </button>
            <div
              className={`hidden xl:flex items-center space-x-2 ${
                isMenuOpen ? "flex-col absolute bg-white" : ""
              }`}
            >
              <Link to="/home">
                <button className="nav-btn flex items-center justify-center">
                  <FontAwesomeIcon icon={faHome} size={iconSize} />
                  <span className="font-bold text-lg lg:ml-3 ml-1">Inicio</span>
                </button>
              </Link>
              <Link to="/home/dashboard">
                <button className="nav-btn ml-1 lg:ml-2 flex items-center justify-center">
                  <FontAwesomeIcon icon={faBookmark} size={iconSize} />
                  <span className="font-bold text-lg lg:ml-3 ml-1">
                    Proyectos
                  </span>
                </button>
              </Link>
              <Link to="/evaluated">
                <button className="nav-btn ml-1 lg:ml-2 flex items-center justify-center">
                  <FontAwesomeIcon icon={faSquareCheck} size={iconSize} />
                  <span className="font-bold text-lg lg:ml-3 ml-1">
                    Evaluados
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="center-container flex justify-center items-center">
          <div className="title-text text-black pt-2 pl-5 pr-5 flex items-center justify-center h-12">
            <span>Feria de ciencias “Triunfando en el conocimiento”</span>
            <span>Universidad de Tarapacá</span>
          </div>
        </div>
        <div className="right-container flex justify-end">
          <button>
            <FontAwesomeIcon icon={faRightToBracket} size={iconSize} />
          </button>
        </div>
      </div>
    </>
  );
}
