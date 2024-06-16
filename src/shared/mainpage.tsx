import { faFileExcel, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useProps } from "../hooks/useProps";
import { useState } from "react";
import axios from "axios";
import RecoverPassword from "../components/RecoverPasswordModal/recover";
import '../styles/mainpage.css'

export const MainPage = () => {
  const { userName, userType } = useProps()

  const [modal, setModal] = useState(false);

  const showModal = () => setModal(!modal);
  const date = new Date()
  const currentYear = date.getFullYear()
  
  const excel = async () => {
    await axios
      .post(
        "http://localhost:3000/export",
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
        a.download = `evaluaciones_feria_ciencia_${currentYear}.xlsx`;
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
  return (
    <>
      <div className="flex justify-center items-center w-full h-14 rounded-lg bg-gray-100 mb-1 lg:mb-3">
        <h1 className="font-semibold text-2xl text-navy-800 font-roboto">
          ¡Bienvenid@, {userName}! 👋
        </h1>
      </div>
      <div className="bg-davy-gray flex flex-col items-center rounded-lg w-full h-screen">
        <div className="m-6 flex justify-center items-center rounded-lg h-12 w-96 bg-gray-100">
          <span className="text-2xl font-bold text-navy-800 font-roboto">
            Proyectos por asignatura
          </span>
        </div>
        <div
          className={`projects-carousel-container flex flex-col lg:overflow-x-auto lg:whitespace-nowrap m-6`}
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
          className={`admin-btns flex justify-around w-full items-center flex-col mt-10 lg:mt-16`}
        >
          {Number(userType) === 1 && (
            <>
              <div
                className={`excel flex items-center justify-center rounded-full mb-4 lg:mb-0`}
              >
                <button onClick={excel} className="excel-btn">
                  <FontAwesomeIcon icon={faFileExcel} size="xl" />
                  <span className="ml-3 font-semibold text-xl">
                    Descargar excel
                  </span>
                </button>
              </div>

              <div
                className={`recover-passwd flex items-center justify-center rounded-full mb-4 lg:mb-0`}
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
      <RecoverPassword show={modal} close={showModal} />
    </>
  );
};
