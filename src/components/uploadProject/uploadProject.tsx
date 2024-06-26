import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useBackend } from "../../hooks/useBackend";

export const UploadProject = ({asignaturas, handleInterface}) => {
  const {createGroup, createMembers} = useBackend()

  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedAsignatura, setselectedAsignatura] = useState<string[]>([]);
  const [proyecto, setProyecto] = useState({
    projectName: '',
    membersName: '',
    description: '',
  })

  const handleAsignaturaSelection = (serviceId: string) => {
    if (!selectedAsignatura.includes(serviceId)) {
      setselectedAsignatura((prev) => [...prev, serviceId]);
    }
    setDropdownOpen(false);
  };

  const removeSelectedAsignatura = (id) => {
    setselectedAsignatura((prev) => prev.filter((asignaturaId) => asignaturaId !== id));
  };

  const handleUploadProjectInput = ({ target: { name, value } }) => {
    setProyecto({...proyecto, [name]: value})
  }

  const handleUploadProject = async () => {
    const newProject = {
      nombre: proyecto.projectName,
      asignatura_id: selectedAsignatura[0],
      imagen_url: 'https://holaquetal.com//saludos.jpg',
      descripcion: proyecto.description
    }
    try {
      const res = await createGroup(newProject)
      console.log(res)
      const {status, data} = res
      if (status === 201) {
        const newMembers = {
          nombre: ''
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(selectedAsignatura)
  }, [selectedAsignatura])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 sm:px-0 z-10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[500px]">
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
                      onClick={() =>
                        handleAsignaturaSelection(asignatura.id)
                      }
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {asignatura.nombre}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-4">
              {selectedAsignatura.map((asignaturaId) => {
                const service = asignaturas.find(
                  (s) => s.id === asignaturaId
                );
                return (
                  <div
                    key={asignaturaId}
                    className="flex items-center justify-between mb-2 p-2 bg-gray-200 rounded"
                  >
                    <span>{service?.nombre}</span>
                    {progress !== 100 && (
                      <button
                        onClick={() => removeSelectedAsignatura(asignaturaId)}
                        className="text-red-500"
                      >
                        <FontAwesomeIcon icon={faXmarkCircle} size="xl" />
                      </button>
                    )}
                  </div>
                );
              })}
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
              <textarea
                className="w-full pl-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                placeholder="Ingrese la descripción"
                name="description"
                onChange={handleUploadProjectInput}
              />
            </div>

            <div className="border-dashed border-4 border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center space-y-4 mt-4">
              {!preview ? (
                <>
                  <input
                    type="file"
                    className="hidden"
                    id="image-upload"
                    // onChange={handleImageFileUpload}
                  />
                  <label
                    htmlFor="image-upload"
                    className="font-myriad-pro cursor-pointer p-2 bg-gray-100 rounded hover:bg-gray-200 transition"
                  >
                    Arrastra la imagen aquí o haz clic para subirla
                  </label>
                </>
              ) : (
                <div className="relative">
                  <img src={preview} alt="Preview" className="w-full h-auto" />
                  {progress !== 100 && (
                    <button
                      // onClick={removeImage}
                      className="absolute top-0 right-0 mt-2 mr-2 bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 transition"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="pt-5">
              {progress !== 100 && (
                <button
                  onClick={handleUploadProject}
                  className="flex items-center justify-center w-full px-[110px] py-2.5 text-xl font-large text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Guardar
                </button>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <div
                onClick={handleInterface}
                className=" hover:text-gray-900 text-medium"
              >
                Cancelar
              </div>
            </div>
            {progress > 0 && (
              <div className="mt-4">
                <progress
                  value={progress}
                  max="100"
                  className="w-full"
                ></progress>
                {progress === 100 && (
                  <p className="text-green-600 mt-2">
                    ¡Imagen subida exitosamente!
                  </p>
                )}
                {error && (
                  <div className="text-red-600 mt-2">
                    Error: {error.message}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}