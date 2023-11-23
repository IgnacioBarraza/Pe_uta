/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "../../components/Footer/footer";
import Navbar from "../../components/NavBar/navbar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./projectsbysubject.css";

const formatName = (rawName) => {
  // Puedes implementar lógica para formatear el nombre según tus necesidades
  // Por ejemplo, reemplazar caracteres especiales o corregir errores tipográficos
  return rawName.replace(/¡/g, "í").replace(/¢/g, "ó").replace(/ /g, " ");
};

export default function ProjectsBySubject() {
  const { id } = useParams();
  const [projectName, setProjectName] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1050);
  const [grupos, setGrupos] = useState([]);

  const handleResponsive = () => {
    setIsSmallScreen(window.innerWidth <= 1050);
  };

  const getSubjects = async () => {
    try {
      const response = await axios.get("https://bak.torresproject.com/asignaturas");
      const idToNameMap = {};
      response.data.forEach((project) => {
        idToNameMap[project.id] = formatName(project.nombre);
      });
      setProjectName(idToNameMap[id]);
    } catch (error) {
      console.error(error);
    }
  };

  const getGroups = async () => {
    try {
      const response = await axios.get(
        "https://bak.torresproject.com/grupos-asignaturas"
      );

      // Filtrar los grupos por id_asignatura
      const gruposFiltrados = response.data.filter(
        (grupo) => grupo.id_asignatura === parseInt(id, 10)
      );

      // Actualizar el estado con los grupos filtrados
      setGrupos(gruposFiltrados);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResponsive);
    getSubjects();
    getGroups();
    console.log(JSON.stringify(localStorage.getItem('proyectosEvaluados')));

    return () => {
      window.removeEventListener("resize", handleResponsive);
    };
  }, [isSmallScreen]);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div
          className={` flex justify-center items-center ${
            isSmallScreen ? "welcome-mobile" : "mb-3 welcome"
          }`}
        >
          <h1 className="font-semibold text-2xl">Proyectos de {projectName}</h1>
        </div>
        <div className="projects-by-subject-container bg-stone-400 flex flex-col items-center">
          <div
            className={`projects-by-subject-carousel-container flex ${
              isSmallScreen
                ? "flex-col mt-6"
                : "overflow-x-auto whitespace-nowrap m-6"
            }`}
            role="region"
            aria-label="Proyectos disponibles"
          >
            <div className="projects-by-subject-wrapper-container flex">
              {grupos.map((grupo) => (
                <div
                  key={grupo.id_grupo}
                  className="projects-by-subject-btn-container bg-stone-300 mx-4 mb-20"
                >
                  <div className="project-btn flex flex-col items-center">
                    <Link to={`/project_id/${grupo.id_grupo}`}>
                      <div
                        aria-label={`Ir a ${grupo.nombre_grupo}`}
                        className="mb-3"
                      >
                        <div className="project-img flex justify-center items-center">
                          <img
                            src={`${grupo.imagen_url}`}
                            alt={`Imagen del proyecto ${grupo.nombre_grupo}`}
                            className={`${
                              isSmallScreen ? "rounded-none" : "rounded-xl"
                            }`}
                          />
                        </div>
                      </div>
                      <div className="project-by-subject-title flex justify-center items-center rounded-2xl">
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
