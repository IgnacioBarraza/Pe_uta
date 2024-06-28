import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/projectsevaluated.css'


export default function Projects() {
  const [gruposFiltrados, setGruposFiltrados] = useState([]);
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
        console.log("No hay grupo_id almacenados en el storage.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGroupsFiltered();
  }, []);

  return (
    <>
      <div
          className="flex justify-center items-center bg-gray-100 rounded-lg mb-3 h-12"
        >
          <h1 className="font-bold text-2xl text-navy-800 rounded-lg">Proyectos evaluados</h1>
        </div>
        <div className="w-full h-[77vh] rounded-lg p-0 bg-davy-gray flex flex-col items-center">
          <div
            className="flex-grow mt-8 mb-6 lg:mb-20 overflow-auto w-full"
            role="region"
            aria-label="Proyectos disponibles"
          >
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mx-4 md:mx-24">
              {gruposFiltrados.map((grupo) => (
                <div
                key={grupo.id_grupo}
                className="bg-white rounded-lg shadow-lg transition-shadow hover:shadow-xl lg:w-[350px]"
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
              ))}
            </div>
          </div>
        </div>  
    </>
  );
}
