/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Projects() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1050);
  const [grupos, setGrupos] = useState([]);

  const handleResponsive = () => {
    setIsSmallScreen(window.innerWidth <= 1050);
  };

  const getGroups = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/grupos-asignaturas"
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
      <div
        className="flex justify-center items-center bg-gray-100 rounded-lg mb-3 h-12"
        role="region"
        aria-label="Proyectos disponibles"
      >
        <h1 className="font-semibold text-2xl text-navy-800">
          Proyectos disponibles
        </h1>
      </div>
      <div className="bg-stone-400 bg-cover bg-center w-full h-full bg-no-repeat flex flex-col rounded-lg">
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
