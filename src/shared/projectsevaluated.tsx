/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/NavBar/navbar";
import Footer from "../components/Footer/footer";
import '../styles/projectsevaluated.css'


export default function Projects() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1050);
  const [gruposFiltrados, setGruposFiltrados] = useState([]);

  const handleResponsive = () => {
    setIsSmallScreen(window.innerWidth <= 1050);
  };

  const getGroupsFiltered = async () => {
    try {
      const response = await axios.get("https://bak.torresproject.com/grupos-asignaturas");

      const gruposIdAlmacenados = JSON.parse(localStorage.getItem("proyectosEvaluados"));

      // Verificar si hay algún grupo_id almacenado
      if (gruposIdAlmacenados.length > 0) {
        // Filtrar proyectos basados en los grupo_id almacenados
        const proyectosFiltrados = response.data.filter((proyecto) =>
          gruposIdAlmacenados.some(
            (grupo) => grupo.grupo_id === proyecto.id_grupo
          )
        );

        // proyectosFiltrados ahora contiene solo los proyectos correspondientes a los grupo_id almacenados
        setGruposFiltrados(proyectosFiltrados);
      } else {
        console.log("No hay grupo_id almacenados en localStorage.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResponsive);
    getGroupsFiltered();
  
    return () => {
      window.removeEventListener("resize", handleResponsive);
    };
  }, [isSmallScreen]);

  return (
    <>
      <div className="total-evaluated-page-container">
        <div
          className={`welcome flex justify-center items-center ${
            isSmallScreen ? "" : "mb-3"
          }`}
        >
          <h1 className="font-semibold text-2xl">Proyectos</h1>
        </div>
        <div className="total-evaluated-project-container bg-stone-400 flex flex-col items-center">
          <div
            className={`total-projects-carousel-container flex flex-col overflow-y-auto ${
              isSmallScreen ? "mt-4" : "m-9"
            }`}
            role="region"
            aria-label="Proyectos disponibles"
          >
            <div className="total-projects-wrapper-container">
              {gruposFiltrados.map((grupo) => (
                <div
                  key={grupo.id_grupo}
                  className="total-project-btn-container bg-stone-300 mx-4 mb-20"
                >
                  <div className="project-btn flex flex-col items-center">
                    <div className="mb-3">
                      <div className="total-project-img flex justify-center items-center mb-3">
                        <img
                          src={`${grupo.imagen_url}`}
                          alt={`Imagen del proyecto ${grupo.nombre_grupo}`}
                          className={`${isSmallScreen ? "rounded-none" : "rounded-xl"}`}
                        />
                      </div>
                      <div className="total-project-title flex justify-center items-center rounded-2xl">
                        <span className="font-semibold text-2xl text-white">
                          {grupo.nombre_grupo}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
