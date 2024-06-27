import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useBackend } from "../../hooks/useBackend";

export const UploadProject = ({ asignaturas, handleInterface }) => {
  const { createGroup, createMembers } = useBackend();

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedAsignatura, setSelectedAsignatura] = useState<string | null>(null);
  const [success, setSuccess] = useState(false)
  const [proyecto, setProyecto] = useState({
    projectName: '',
    membersName: '',
    description: '',
    imagen_url: ''
  });

  const handleAsignaturaSelection = (serviceId: string) => {
    setSelectedAsignatura(serviceId);
    setDropdownOpen(false);
  };

  const removeSelectedAsignatura = () => {
    setSelectedAsignatura(null);
  };

  const handleUploadProjectInput = ({ target: { name, value } }) => {
    setProyecto({ ...proyecto, [name]: value });
  };

  const handleUploadProject = async () => {
    const newProject = {
      nombre: proyecto.projectName,
      asignatura_id: selectedAsignatura,
      imagen_url: proyecto.imagen_url,
      descripcion: proyecto.description,
    };
    try {
      const res = await createGroup(newProject);
      const { status, data } = res;
      if (status === 201) {
        const projectId = data.proyecto.id;
        const membersArray = proyecto.membersName
          .split(",")
          .map((member) => member.trim());
        const newMembers = membersArray.map((member) => {
          const [nombre, ...apellidosArray] = member.split(" ");
          const apellidos = apellidosArray.join(" ");
          return {
            nombre,
            apellidos,
            grupo_id: projectId,
          };
        });
        console.log(newMembers);
        const res = await createMembers(newMembers);
        console.log(res);
        setSuccess(true)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 sm:px-0 z-10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px]">
        <h2 className="font-myriad-pro text-xl font-bold mb-4 text-center">
          Agregar Nuevo Proyecto
        </h2>
        {asignaturas.length > 0 && (
          <>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full px-4 py-2 text-left bg-gray-200 rounded-md"
              >
                Selecciona una asignatura
              </button>
              {dropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                  {asignaturas.map((asignatura) => (
                    <div
                      key={asignatura.id}
                      onClick={() => handleAsignaturaSelection(asignatura.id)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {asignatura.nombre}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-4">
              {selectedAsignatura && (
                <div className="flex items-center justify-between mb-2 p-2 bg-gray-200 rounded">
                  <span>
                    {asignaturas.find((s) => s.id === selectedAsignatura)?.nombre}
                  </span>
                  {success && (
                    <button
                      onClick={removeSelectedAsignatura}
                      className="text-red-500"
                    >
                      <FontAwesomeIcon icon={faXmarkCircle} size="xl" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        )}
        <div>
          <div>
            <div className="mt-6">
              <input
                id="projectName"
                name="projectName"
                type="text"
                placeholder="Ingresa el nombre del proyecto"
                className="w-full pl-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                onChange={handleUploadProjectInput}
              />
            </div>

            <div className="mt-4">
              <input
                id="membersName"
                name="membersName"
                type="text"
                placeholder="Ingresa los nombres de los integrantes, separados por comas"
                className="w-full pl-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                onChange={handleUploadProjectInput}
              />
            </div>

            <div className="mt-4">
              <input
                id="imagen_url"
                name="imagen_url"
                type="text"
                placeholder="Ingresa el link de la imagen"
                className="w-full pl-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                onChange={handleUploadProjectInput}
              />
            </div>

            <div className="mt-4">
              <textarea
                className="w-full pl-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                placeholder="Ingrese la descripción"
                name="description"
                onChange={handleUploadProjectInput}
              />
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={handleUploadProject}
                className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
              >
                Guardar Proyecto
              </button>
            </div>
            <div
                onClick={handleInterface}
                className="text-white text-base font-bold flex justify-center items-center mt-4 bg-red-600 hover:bg-red-700 rounded-lg p-2"
              >
                Cancelar
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
