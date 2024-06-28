/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer/footer";
import Navbar from "../components/NavBar/navbar";
import "../styles/evaluateproject.css";
import Formulario from "../components/formulario";

export default function EvaluateProject() {
  const { id } = useParams();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1050);
  const [nombreAsignatura, setNombreAsignatura] = useState("");
  const [nombreGrupo, setnombreGrupo] = useState("");
  const [nombresIntegrantes, setNombresIntegrantes] = useState([]);
  const [integrantes, setIntegrantes] = useState([]);
  const [imagenGrupo, setimagenGrupo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleResponsive = () => {
    setIsSmallScreen(window.innerWidth <= 1050);
  };

  const getGroupById = async () => {
    try {
      const response = await axios.get(
        `https://bak.torresproject.com/grupo-por-id/${id}`
      );
      setNombreAsignatura(response.data[0].nombre_asignatura);
      setnombreGrupo(response.data[0].nombre);
      setimagenGrupo(response.data[0].imagen_url);
      setDescripcion(response.data[0].descripcion);
    } catch (error) {
      console.log(error);
    }
  };

  const getMembersByGroupId = async () => {
    try {
      const response = await axios.get(
        `https://bak.torresproject.com/integrantes-grupo/${id}`
      );
      setIntegrantes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResponsive);
    getGroupById();
    getMembersByGroupId();

    return () => {
      window.removeEventListener("resize", handleResponsive);
    };
  }, [isSmallScreen]);

  return (
    <>
      <div className="w-full h-auto lg:h-[84vh] overflow-auto info-project-container">
        <div className="bg-gray-100 flex justify-center items-center rounded-lg lg:h-12 mb-3">
          <h1 className="font-semibold text-lg lg:text-2xl text-navy-800">Proyecto "{nombreGrupo}"</h1>
        </div>
        <div className="rounded-lg bg-stone-400 flex flex-col overflow-auto">
          <div
            className={`project-info flex ${
              isSmallScreen ? "flex-col items-center m-2" : "m-10"
            }`}
          >
            <div className={`img-project ${isSmallScreen ? "mt-2" : "mr-4"}`}>
              <img
                src={imagenGrupo}
                alt={`Imagen del proyecto ${nombreGrupo}`}
                className="rounded-xl border-zinc-700 border-2"
              />
            </div>
            <div
              className={`project-members flex flex-col items-center ${
                isSmallScreen ? "mt-4 mb-4" : "mr-5"
              }`}
            >
              <span className="font-semibold text-3xl">Integrantes</span>
              <ul>
                {integrantes.map((integrante) => (
                  <li key={integrante.id} className="font-semibold text-lg">
                    - {integrante.nombre} {integrante.apellidos}
                    <br />
                  </li>
                ))}
              </ul>
            </div>
            <div className="project-description flex flex-col">
              <span className="font-semibold text-3xl">
                Descripción del proyecto
              </span>
              <p className="font-normal text-lg mt-2">{descripcion}</p>
            </div>
          </div>
          <Formulario group_id={id} />
        </div>
      </div>
    </>
  );
}
