/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "../../components/Footer/footer";
import Navbar from "../../components/NavBar/navbar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
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

  useEffect(() => {
    window.addEventListener("resize", handleResponsive);
    getSubjects();
    return () => {
      window.removeEventListener("resize", handleResponsive);
    };
  }, [isSmallScreen]);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div
          className={`welcome flex justify-center items-center ${
            isSmallScreen ? "" : "mb-3"
          }`}
        >
          <h1 className="font-semibold text-2xl">Proyectos de {projectName}</h1>
        </div>
        <div className="project-container bg-stone-400 flex flex-col items-center"></div>
      </div>
      <div
        className={`${isSmallScreen ? "fixed bottom-0 left-0 right-0" : ""}`}
      >
        <Footer />
      </div>
    </>
  );
}
