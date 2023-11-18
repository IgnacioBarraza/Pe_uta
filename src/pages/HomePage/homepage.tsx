import "./homepage.css";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {

  const rut = localStorage.getItem("userRut");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1050);

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
      <Navbar />
      <div className="page-container bg-stone-100 flex flex-col" aria-live="polite">
        <div className={`welcome flex justify-center items-center ${isSmallScreen ? "" : "mb-3"}`}>
          <h1 className="font-semibold text-2xl">¡Bienvenido/a, {rut} 👋</h1>
        </div>
        <div className="home-container bg-stone-400 flex flex-col items-center">
          <div className="subject-text m-6 flex justify-center items-center rounded-lg">
            <span className="text-2xl font-bold">
              Proyectos por asignatura
            </span>
          </div>
          <div
            className={`projects-carousel-container  flex ${
              isSmallScreen
                ? "flex-col"
                : "overflow-x-auto whitespace-nowrap m-6"
            }`}
            role="region"
            aria-label="Proyectos disponibles"
          >
            <div className="projects-wrapper-container flex">
              <div className="project-btn-container bg-stone-300 mx-4 mb-4">
                <div className="project-btn flex flex-col items-center">
                  <Link to={"/projects_by_subject/1"}>
                    <button aria-label="Ir a Introducción a la Física">
                      <div className="intro-fisica-img"></div>
                      <div className="project-subject flex justify-center items-center">
                        <span className="font-semibold text-xl">
                          Introducción a la Física
                        </span>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="project-btn-container bg-stone-300 mx-4 mb-4">
                <div className="project-btn">
                  <Link to={"/projects_by_subject/2"}>
                    <button aria-label="Ir a Mecánica Clásica">
                      <div className="mecanica-clasica-img"></div>
                      <div className="project-subject flex justify-center items-center">
                        <span className="font-semibold text-xl">
                          Mecánica Clásica
                        </span>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="project-btn-container bg-stone-300 mx-4 mb-4">
                <div className="project-btn">
                  <Link to={"/projects_by_subject/3"}>
                    <button aria-label="Ir a Electromagnetismo">
                      <div className="electro-img"></div>
                      <div className="project-subject flex justify-center items-center">
                        <span className="font-semibold text-xl">
                          Electromagnetismo
                        </span>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
              {/* <div className="project-btn-container bg-stone-300 mx-4 mb-4">
                <div className="project-btn">
                  <Link to={'/projects_by_subject/4'}>
                    <button aria-label="Ir a Kinesiología">
                      Kinesiología
                    </button>
                  </Link>
                </div>
              </div> */}
              <div className="project-btn-container bg-stone-300 mx-4 mb-4">
                <div className="project-btn">
                  <Link to={"/projects_by_subject/5"}>
                    <button aria-label="Ir a Física Contemporanea">
                      <div className="fisica-contemporanea-img"></div>
                      <div className="project-subject flex justify-center items-center">
                        <span className="font-semibold text-xl">
                          Física Contemporanea
                        </span>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
              {/* EN CASO DE NECESITAR AGREGAR UN NUEVO RAMO, COPIAR EL CONTENIDO DE ESTE COMENTARIO
                  Y CAMBIARLE LOS DATOS NECESARIOS :D
                <div className="project-btn-container bg-stone-300 mx-4 mb-4">
                <div className="project-btn">
                  <Link to={"/projects_by_subject/ID DEL RAMO (numero)"}>
                    <button aria-label="Ir a CAMBIAR POR EL NOMBRE DEL RAMO">
                      <div className="nombre-ramo-img"></div>
                      <div className="project-subject flex justify-center items-center">
                        <span className="font-semibold text-xl">
                          NOMBRE RAMO
                        </span>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
                */}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${isSmallScreen ? "fixed bottom-0 left-0 right-0" : ""}`}
      >
        <Footer />
      </div>
    </>
  );
}
