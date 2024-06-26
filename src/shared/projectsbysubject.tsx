import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const formatName = (rawName) => {
  return rawName.replace(/¡/g, "í").replace(/¢/g, "ó").replace(/ /g, " ");
};

export default function ProjectsBySubject() {
  const { subject_name, id } = useParams();
  const [projectName, setProjectName] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1050);
  const [grupos, setGrupos] = useState([]);

  const handleResponsive = () => {
    setIsSmallScreen(window.innerWidth <= 1050);
  };

  const getSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/asignaturas");
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
        "http://localhost:3000/grupos-asignaturas"
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
    console.log(JSON.stringify(localStorage.getItem("proyectosEvaluados")));

    return () => {
      window.removeEventListener("resize", handleResponsive);
    };
  }, [isSmallScreen, subject_name, id]);

  return (
    <>
      <div
        className={`welcome flex justify-center items-center ${
          isSmallScreen ? "" : "mb-3"
        }`}
      >
        <h1 className="font-semibold text-2xl">Proyectos de {projectName}</h1>
      </div>
      <div className="bg-stone-400 bg-cover bg-center w-full min-h-screen bg-no-repeat flex flex-col rounded-lg">
        <div
          className="flex-grow mx-auto mt-8 mb-20"
          role="region"
          aria-label="Proyectos disponibles"
        >
          <h2 className="sr-only">Proyectos disponibles</h2>
          <div
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ml-4 mr-4 md:ml-24 md:mr-24"
            role="list"
          >
            {grupos.map((grupo) => (
              <Link
                to={`/project_id/${grupo.id_grupo}`}
                className="mb-3"
                key={grupo.id_grupo}
              >
                <div
                  className="bg-white rounded-lg shadow-lg transition-shadow hover:shadow-xl cursor-pointer"
                  role="listitem"
                >
                  <img
                    src={grupo.imagen_url}
                    alt={grupo.nombre_grupo}
                    className="w-full h-48 sm:h-64 md:h-64 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">
                      {grupo.nombre_grupo}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
