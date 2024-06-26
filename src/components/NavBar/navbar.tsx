/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavbarOptions } from "./components/navbarOptions";
import { useProps } from "../../hooks/useProps";

export default function Navbar() {
  const { logout } = useProps()
  const navigate = useNavigate();

  const iconSize = "xl";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleResize = () => {
    if (window.innerWidth >= 1280 && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout()
    navigate("/");
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 text-dark-gray">
      <div className="flex items-center justify-center lg:max-w-[500px] lg:w-full">
        <NavbarOptions toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} iconSize={iconSize}/>
      </div>
      <div className="flex justify-center items-center lg:max-w-[500px] lg:w-full grow">
        <div className="title-text flex items-center justify-center h-12">
          <span className="font-semibold text-lg lg:text-2xl text-navy-800 font-roboto">
            Feria de divulgación universitaria
          </span>
          <span className="text-navy-800 text-sm font-bold">Universidad de Tarapacá</span>
        </div>
      </div>
      <div className="flex justify-end lg:max-w-[500px] lg:w-full">
        <button
          onClick={handleLogout}
          aria-label="Cerrar Sesión"
          className="text-dark-gray hover:text-deep-sky-blue hover:animate-beat-fade"
        >
          <FontAwesomeIcon icon={faRightToBracket} size={iconSize} />
        </button>
      </div>
    </div>
  );
}
