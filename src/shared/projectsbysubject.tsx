import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const formatName = (rawName) => {
  return rawName.replace(/¡/g, "í").replace(/¢/g, "ó").replace(/ /g, " ");
};

export default function ProjectsBySubject() {
  const { id } = useParams();
  const [projectName, setProjectName] = useState("");
  const [grupos, setGrupos] = useState([]);

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
    getGroups()
    getSubjects()
  })

  return (
    <>
      <div
        className="flex justify-center items-center bg-gray-100 rounded-lg mb-3 h-12"
        role="region"
        aria-label="Proyectos disponibles"
      >
        <h1 className="font-semibold text-xl lg:text-2xl text-navy-800">
          Proyectos de {projectName}
        </h1>
      </div>
      <div className="bg-davy-gray bg-cover bg-center w-full h-full bg-no-repeat flex flex-col rounded-lg">
        <div className="flex-grow mt-8 mb-6 lg:mb-20 overflow-auto">
          <div
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mx-4 md:mx-24"
            role="list"
          >
            {grupos.map((grupo) => (
              <Link
                to={`/home/project/${grupo.nombre_grupo}/${grupo.id_grupo}`}
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
