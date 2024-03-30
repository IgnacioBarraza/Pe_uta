/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/NavBar/navbar";
import Footer from "../components/Footer/footer";
import "../styles/projects.css";

export default function Projects() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1050);
  const [grupos, setGrupos] = useState([]);

  const handleResponsive = () => {
    setIsSmallScreen(window.innerWidth <= 1050);
  };

  const getGroups = async () => {
    try {
      const response = await axios.get(
        "https://bak.torresproject.com/grupos-asignaturas"
      );

      const gruposIdAlmacenados = JSON.parse(
        localStorage.getItem("proyectosEvaluados")
      );

      if (
        JSON.parse(localStorage.getItem("proyectosEvaluados")) != null &&
        JSON.parse(localStorage.getItem("proyectosEvaluados")).length != 0
      ) {
        if (gruposIdAlmacenados.length > 0) {
          // Filtrar proyectos excluyendo los que coinciden con los grupo_id almacenados
          const groupsFiltered = response.data.filter(
            (proyecto) =>
              !gruposIdAlmacenados.some(
                (grupo) => grupo.grupo_id === proyecto.id_grupo
              )
          );

          // groupsFiltered ahora contiene solo los proyectos que no coinciden con los grupo_id almacenados
          setGrupos(groupsFiltered);
        } else {
          console.log("No hay grupo_id almacenados en localStorage.");
        }
      } else {
        setGrupos(response.data);
        console.log("No hay grupo_id almacenados en localStorage.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResponsive);
    getGroups();
    return () => {
      window.removeEventListener("resize", handleResponsive);
    };
  }, [isSmallScreen]);

  return (
    <>
      <Navbar />
      <div className="total-page-container">
        <div
          className={`welcome flex justify-center items-center ${
            isSmallScreen ? "" : "mb-3"
          }`}
        >
          <h1 className="font-semibold text-2xl">Proyectos</h1>
        </div>
        <div className="total-project-container bg-stone-400 flex flex-col items-center">
          <div
            className={`total-projects-carousel-container flex flex-col overflow-y-auto ${
              isSmallScreen ? "mt-4" : "m-9"
            }`}
            role="region"
            aria-label="Proyectos disponibles"
          >
            <h2 className="sr-only">Proyectos disponibles</h2>
            <div className="total-projects-wrapper-container" role="list">
              {grupos.map((grupo) => (
                <div
                  key={grupo.id_grupo}
                  className="total-project-btn-container bg-stone-300 mx-4 mb-20"
                  role="listitem"
                >
                  <div className="project-btn flex flex-col items-center">
                    <Link to={`/project_id/${grupo.id_grupo}`} className="mb-3">
                      <div className="total-project-img flex justify-center items-center mb-3">
                        <img
                          src={`${grupo.imagen_url}`}
                          alt={`Imagen del proyecto ${grupo.nombre_grupo}`}
                          className={`${
                            isSmallScreen ? "rounded-none" : "rounded-xl"
                          }`}
                        />
                      </div>
                      <div className="total-project-title flex justify-center items-center rounded-2xl">
                        <span className="font-semibold text-2xl text-white">
                          {grupo.nombre_grupo}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`${isSmallScreen ? "" : ""}`}>
        <Footer />
      </div>
    </>
  );
}
