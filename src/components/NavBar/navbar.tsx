/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect, useState } from "react";

export default function Navbar() {
  const iconSize = "xl";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleResize = () => {
    if (window.innerWidth >= 1280 && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  // Add resize event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="navbar flex justify-between items-center p-4">
        <div className="left-container flex items-center justify-center">
          <div className="nav-btns flex items-center">
          <button className="xl:hidden" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} size={iconSize} />
          </button>
          <div className={`xl:flex items-center ${isMenuOpen ? "flex-col absolute top-24 left-1 hamburguer-menu" : "hidden"}`}>
            <Link to="/home">
            {/* nav-btn flex items-center justify-center */}
              <button className={`xl:flex items-center ${isMenuOpen ? "flex items-start menu-nav-btn mb-2" : "nav-btn flex items-center justify-center"}`}>
                <FontAwesomeIcon icon={faHome} size={iconSize} />
                <span className="font-semibold text-lg lg:ml-3 ml-1">Inicio</span>
              </button>
            </Link>
            <Link to="/home/dashboard">
              <button className={`xl:flex items-center ${isMenuOpen ? "flex items-start menu-nav-btn mb-2" : "nav-btn flex items-center justify-center"}`}>
                <FontAwesomeIcon icon={faBookmark} size={iconSize} />
                <span className="font-semibold text-lg lg:ml-3 ml-1">Proyectos</span>
              </button>
            </Link>
            <Link to="/evaluated">
            {/* ml-1 lg:ml-2 */}
              <button className={`xl:flex items-center ${isMenuOpen ? "flex items-start menu-nav-btn" : "nav-btn flex items-center justify-center"}`}>
                <FontAwesomeIcon icon={faSquareCheck} size={iconSize} />
                <span className="font-semibold text-lg lg:ml-3 ml-1">Evaluados</span>
              </button>
            </Link>
          </div>
        </div>
        </div>
        <div className="center-container flex justify-center items-center">
          <div className="title-text text-black flex items-center justify-center h-12">
            <span className="font-semibold title">Feria de ciencias “Triunfando en el conocimiento”</span>
            <span className="font-semibold title">Universidad de Tarapacá</span>
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
