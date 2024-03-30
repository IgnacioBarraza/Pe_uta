import "../styles/homepage.css";
import Navbar from "../components/NavBar/navbar";
import Footer from "../components/Footer/footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faKey } from "@fortawesome/free-solid-svg-icons";
import RecoverPassword from "../components/RecoverPasswordModal/recover";

export default function HomePage() {
  const rut = localStorage.getItem("userRut");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1050);
  const [modal, setModal] = useState(false);

  const handleResponsive = () => {
    setIsSmallScreen(window.innerWidth <= 1050);
  };

  const showModal = () => setModal(!modal);

  const excel = async () => {
    await axios
      .post(
        "https://bak.torresproject.com/export",
        {
          tipo: 1,
        },
        {
          responseType: "blob", // Indica que esperas una respuesta de tipo Blob
        }
      )
      .then((response) => {
        // Crear un enlace (link) temporal para el archivo Blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "evaluaciones.xlsx";

        // Simular un clic en el enlace para iniciar la descarga
        document.body.appendChild(a);
        a.click();

        // Limpiar el enlace y liberar recursos
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
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
      <div
        className="page-container bg-stone-100 flex flex-col"
        aria-live="polite"
      >
        <div
          className={`welcome flex justify-center items-center ${
            isSmallScreen ? "" : "mb-3"
          }`}
        >
          <h1 className="font-semibold text-2xl">¡Bienvenido/a, {rut} 👋</h1>
        </div>
        <div className="home-container bg-stone-400 flex flex-col items-center">
          <div className="subject-text m-6 flex justify-center items-center rounded-lg">
            <span className="text-2xl font-bold">Proyectos por asignatura</span>
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
              <div className="project-btn-container bg-stone-300 mx-4 mb-2">
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
              <div className="project-btn-container bg-stone-300 mx-4 mb-2">
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
              <div className="project-btn-container bg-stone-300 mx-4 mb-2">
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
              <div className="project-btn-container bg-stone-300 mx-4 mb-2">
                <div className="project-btn">
                  <Link to={"/projects_by_subject/5"}>
                    <button aria-label="Ir a Física Contemporanea">
                      <div className="fisica-contemporanea-img"></div>
                      <div className="project-subject flex justify-center items-center">
                        <span className="font-semibold text-xl">
                          Física contemporánea
                        </span>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="project-btn-container bg-stone-300 mx-4 mb-2">
                <div className="project-btn">
                  <Link to={"/projects_by_subject/6"}>
                    <button aria-label="Ir a Categoria Especial">
                      <div className="categoria-especial-img"></div>
                      <div className="project-subject flex justify-center items-center">
                        <span className="font-semibold text-xl">
                          Categoría especial
                        </span>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`admin-btns flex justify-around w-full items-center ${
              isSmallScreen ? "flex-col mt-10" : "mt-16"
            }`}
          >
            {Number(localStorage.getItem("tipoId")) === 1 && (
              <>
                <div
                  className={`excel flex items-center justify-center rounded-full ${
                    isSmallScreen ? "mb-4" : ""
                  }`}
                >
                  <button onClick={excel} className="excel-btn">
                    <FontAwesomeIcon icon={faFileExcel} size="xl" />
                    <span className="ml-3 font-semibold text-xl">
                      Descargar excel
                    </span>
                  </button>
                </div>

                <div
                  className={`recover-passwd flex items-center justify-center rounded-full ${
                    isSmallScreen ? "mb-4" : ""
                  }`}
                >
                  <button
                    className="recover-btn flex items-center justify-center"
                    onClick={() => showModal()}
                  >
                    <FontAwesomeIcon icon={faKey} size="xl" />
                    <span className="ml-3 font-semibold text-2xl text-amber-950">
                      Recuperar contraseña
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <RecoverPassword show={modal} close={showModal} />
    </>
  );
}
