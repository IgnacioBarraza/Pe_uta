import { faBars, faBookmark, faHome, faSquareCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const NavbarOptions = ({toggleMenu, isMenuOpen, iconSize}) => {
  return (
    <div className="flex items-center">
      <button
        className="xl:hidden"
        onClick={toggleMenu}
        aria-label="Toggle Menú"
      >
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size={iconSize} />
      </button>
      <div
        className={`xl:flex items-center ${
          isMenuOpen
            ? "flex-col absolute top-[75px] left-0 bg-gray-100 shadow-lg rounded-b-md p-4"
            : "hidden"
        }`}
      >
        <Link to="/home">
          <button
            className={`flex items-center text-navy-800 ${
              isMenuOpen
                ? "items-start bg-gray-300 py-2 px-4 rounded mb-2 w-full"
                : "items-center justify-center hover:bg-gray-300 hover:animate-beat-fade w-36 h-12 rounded-lg"
            }`}
            aria-label="Ir a Inicio"
          >
            <FontAwesomeIcon icon={faHome} size={iconSize} className="mr-1"/>
            <span className="font-semibold text-lg lg:ml-3">Inicio</span>
          </button>
        </Link>
        <Link to="projects">
          <button
            className={`flex items-center text-navy-800 ${
              isMenuOpen
                ? "items-start bg-gray-300 py-2 px-4 rounded mb-2 w-full"
                : "items-center justify-center hover:bg-gray-300 hover:animate-beat-fade w-36 h-12 rounded-lg"
            }`}
            aria-label="Ir a Proyectos"
          >
            <FontAwesomeIcon icon={faBookmark} size={iconSize} className="ml-1 mr-2"/>
            <span className="font-semibold text-lg lg:ml-3">
              Proyectos
            </span>
          </button>
        </Link>
        <Link to="evaluated">
          <button
            className={`flex items-center text-navy-800 ${
              isMenuOpen
                ? "items-start bg-gray-300 py-2 px-4 rounded w-full"
                : "items-center justify-center hover:bg-gray-300 hover:animate-beat-fade w-36 h-12 rounded-lg"
            }`}
            aria-label="Ir a Evaluados"
          >
            <FontAwesomeIcon icon={faSquareCheck} size={iconSize} className="ml-1 mr-1"/>
            <span className="font-semibold text-lg lg:ml-3">
              Evaluados
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};
