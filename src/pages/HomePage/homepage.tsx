import "./homepage.css";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1050);
  const rut = localStorage.getItem("userRut");

  const handleResponsive = () => {
    setIsSmallScreen(window.innerWidth <= 1050);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResponsive);

    return () => {
      window.removeEventListener("resize", handleResponsive);
    };
  }, [isSmallScreen]);

  return (
    <>
      {/* fixed left-0 right-0 z-10 */}
      <div className="">
        <Navbar />
      </div>
      <div className="page-container bg-stone-100 flex flex-col">
        <div
          className={`welcome flex justify-center items-center ${
            isSmallScreen ? "" : "mb-3"
          }`}
        >
          <span className="font-semibold text-2xl">
            ¡Bienvenido/a, {rut} 👋
          </span>
        </div>
        <div className="home-container bg-stone-400 flex justify-center">
          <div
            className={`projects-carousel-container m-4 flex ${
              isSmallScreen
                ? "flex-col overflow-scroll"
                : "overflow-x-auto whitespace-nowrap"
            } items-center`}
          >
            <div className="projects-wrapper-container flex">
              <div className="project-btn-container bg-stone-300 mx-2 mb-4"></div>
              <div className="project-btn-container bg-stone-300 mx-2 mb-4"></div>
              <div className="project-btn-container bg-stone-300 mx-2 mb-4"></div>
              <div className="project-btn-container bg-stone-300 mx-2 mb-4"></div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      {/* fixed left-0 right-0 bottom-0 */}
      <div className="">
        <Footer />
      </div>
    </>
  );
}
