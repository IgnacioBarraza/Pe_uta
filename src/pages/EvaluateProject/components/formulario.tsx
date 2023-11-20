/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import './formulario.css'

export default function Formulario() {

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1050);

  const handleResponsive = () => {
    setIsSmallScreen(window.innerWidth <= 1050);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResponsive);

    return () => {
      window.removeEventListener("resize", handleResponsive);
    };
  }, [isSmallScreen]);

  return (
    <>
    <div
            className={`project-evaluation flex flex-col ${
              isSmallScreen ? " items-center m-3" : "mr-10 mb-10 ml-10 mt-5"
            }`}
          >
            <span className="title-evaluation font-bold text-2xl">
              Evaluación
            </span>
            <div className="evaluation-form-container mt-5">
              <form>
                <div className="criterios flex items-center justify-between mb-2">
                  <div className="mt-2 flex justify-around">
                    <label
                      htmlFor="c1"
                      className="primer-criterio font-semibold text-xl"
                    >
                      Creatividad - animación, Video incluye portada con nombre
                      de integrantes y universidad, introducción, objetivos,
                      descripción experiencia, demostración práctica y con
                      ecuaciones, análisis, conclusiones
                    </label>
                  </div>
                  <div className="criterio-options">
                    <select name="puntuacion" id="c1" className="select-container" defaultValue={"--"}>
                      <option value="--">--</option>
                      <option value="Excelente">Excelente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Aceptable">Aceptable</option>
                      <option value="Insuficiente">Insuficiente</option>
                    </select>
                  </div>
                </div>
                <div className="criterios flex items-center justify-between mb-2">
                  <div className="mt-2 flex justify-around">
                    <label
                      htmlFor="c2"
                      className="segundo-criterio font-semibold text-xl"
                    >
                      Usa voz clara, con volumen apropiado, sin uso de
                      muletillas y con buen ritmo, de modo que se pueda oír y
                      seguir. Además, el orden de sus ideas sigue una lógica
                      clara. No lee de apuntes.
                    </label>
                  </div>
                  <div className="criterio-options">
                    <select name="puntuacion" id="c2" className="select-container" defaultValue={"--"}>
                      <option value="--">--</option>
                      <option value="Excelente">Excelente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Aceptable">Aceptable</option>
                      <option value="Insuficiente">Insuficiente</option>
                    </select>
                  </div>
                </div>
                <div className="criterios flex items-center justify-between mb-2">
                  <div className="mt-2 flex justify-around">
                    <label
                      htmlFor="c3"
                      className="tercer-criterio font-semibold text-xl"
                    >
                      Material reciclado, reutilizado
                    </label>
                  </div>
                  <div className="criterio-options">
                    <select name="puntuacion" id="c3" className="select-container" defaultValue={"--"}>
                      <option value="--">--</option>
                      <option value="Excelente">Excelente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Aceptable">Aceptable</option>
                      <option value="Insuficiente">Insuficiente</option>
                    </select>
                  </div>
                </div>
                <div className="criterios flex items-center justify-between mb-2">
                  <div className="mt-2 flex justify-around">
                    <label
                      htmlFor="c4"
                      className="cuarto-criterio font-semibold text-xl"
                    >
                      La demostración y aplicación de las ecuaciones pudo
                      realizarse de acuerdo con los objetivos con posibilidad de
                      replicarse a nivel real y como ejemplo pedagógico.
                    </label>
                  </div>
                  <div className="criterio-options">
                    <select name="puntuacion" id="c4" className="select-container" defaultValue={"--"}>
                      <option value="--">--</option>
                      <option value="Excelente">Excelente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Aceptable">Aceptable</option>
                      <option value="Insuficiente">Insuficiente</option>
                    </select>
                  </div>
                </div>
                <div className="criterios flex items-center justify-between mb-2">
                  <div className="mt-2 flex justify-around">
                    <label
                      htmlFor="c5"
                      className="quinto-criterio font-semibold text-xl"
                    >
                      El tiempo total de presentación no es exagerado
                    </label>
                  </div>
                  <div className="criterio-options">
                    <select name="puntuacion" id="c5" className="select-container" defaultValue={"--"}>
                      <option value="--">--</option>
                      <option value="Excelente">Excelente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Aceptable">Aceptable</option>
                      <option value="Insuficiente">Insuficiente</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
    </>
  )
}