import { faFileExcel, faFileUpload, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProps } from "../../hooks/useProps";
import { useEffect, useState } from "react";
import { useBackend } from "../../hooks/useBackend";
import RecoverPassword from "../../components/RecoverPasswordModal/recover";
import ProjectButton from "./components/ProjectButton";
import "../../styles/mainpage.css";
import { UploadProject } from "../../components/uploadProject/uploadProject";

const SubjectProjects = [
  {
    key: "1",
    to: "projects/intro-fisica/1",
    label: "Ir a Introducción a la Física",
    imgClass: "intro-fisica-img",
    subject: "Introducción a la Física",
  },
  {
    key: "2",
    to: "projects/mecanica-clasica/2",
    label: "Ir a Mecánica Clásica",
    imgClass: "mecanica-clasica-img",
    subject: "Mecánica Clásica",
  },
  {
    key: "3",
    to: "projects/electromagnetismo/3",
    label: "Ir a Electromagnetismo",
    imgClass: "electro-img",
    subject: "Electromagnetismo",
  },
  {
    key: "4",
    to: "projects/fisica-contemporanea/4",
    label: "Ir a Física Contemporanea",
    imgClass: "fisica-contemporanea-img",
    subject: "Física Contemporanea",
  },
  {
    key: "5",
    to: "projects/kinesiología/5",
    label: "Ir a Kinesiología",
    imgClass: "kine-img",
    subject: "Kinesiología",
  }
]

export const MainPage = () => {
  const { userName, userType } = useProps();
  const { exportExcel, getAsignaturas } = useBackend()

  const [modal, setModal] = useState(false);
  const [uploadInterface, setUploadInterface] = useState(false);
  const [asignaturas, setAsignaturas] = useState(null)

  const showModal = () => setModal(!modal);
  const showInterface = () => setUploadInterface(!uploadInterface)
  const date = new Date();
  const currentYear = date.getFullYear();

  const excel = async () => {
    await exportExcel().then((response) => {
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

  const getAsignaturasData = async () => {
    try {
      const res = await getAsignaturas()
      setAsignaturas(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleInterface = () => {
    setUploadInterface((prevState) => !prevState)
  }

  useEffect(() => {
    getAsignaturasData()
  }, [])
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
          className="projects-carousel-container flex flex-col lg:overflow-x-auto lg:whitespace-nowrap m-6"
          role="region"
          aria-label="Proyectos disponibles"
        >
          <div className="projects-wrapper-container flex">
            {SubjectProjects.map((subject) => (
              <ProjectButton
                key={subject.key}
                to={subject.to}
                label={subject.label}
                imgClass={subject.imgClass}
                subject={subject.subject}
              />
            ))}
          </div>
        </div>
        <div
          className={`admin-btns flex justify-around w-full items-center flex-col mt-10 lg:mt-16`}
        >
          {Number(userType) === 1 && (
            <>
              <div className="flex flex-row items-center justify-around w-full">
                <div
                  className="w-14 h-14 lg:w-64 lg:h-16 flex items-center justify-center rounded-full mb-4 lg:mb-0 bg-green-600"
                >
                  <button onClick={excel} className="h-full w-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faFileExcel} size="xl" />
                    <span className="ml-3 font-bold text-2xl hidden lg:block">
                      Descargar excel
                    </span>
                  </button>
                </div>
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full mb-4 lg:mb-0 bg-gray-100 lg:w-80 lg:h-16"
                >
                  <button onClick={() => showInterface()} className="h-full w-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faFileUpload} size="xl" />
                    <span className="ml-3 font-bold text-2xl hidden lg:flex text-navy-800">
                      Subir proyecto
                    </span>
                  </button>
                </div>
                <div
                  className={`w-14 h-14 lg:w-[350px] lg:h-16 flex items-center justify-center rounded-full mb-4 lg:mb-0 bg-gray-100`}
                >
                  <button
                    className="h-full w-full flex items-center justify-center"
                    onClick={() => showModal()}
                  >
                    <FontAwesomeIcon icon={faKey} size="xl" />
                    <span className="ml-3 font-bold text-2xl text-navy-800 hidden lg:block">
                      Recuperar contraseña
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <RecoverPassword show={modal} close={showModal} />
      {uploadInterface && (
        <UploadProject asignaturas={asignaturas} handleInterface={handleInterface}/>
      )}
    </>
  );
};
