/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./formulario.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type FormData = {
  criterio_1: string;
  criterio_2: string;
  criterio_3: string;
  criterio_4: string;
  criterio_5: string;
};

export default function Formulario({ group_id }) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1050);
  const {
    register,
    handleSubmit,
  } = useForm<FormData>();

  const handleResponsive = () => {
    setIsSmallScreen(window.innerWidth <= 1050);
  };

  const navigate = useNavigate()

  const onSubmit = async (data: FormData) => {
    if (
      data.criterio_1 != "--" &&
      data.criterio_2 != "--" &&
      data.criterio_3 != "--" &&
      data.criterio_4 != "--" &&
      data.criterio_5 != "--"
    ) {
      const formatedData = {
        criterio_1: parseFloat((Number(data.criterio_1) * 0.45).toFixed(2)),
        criterio_2: parseFloat((Number(data.criterio_1) * 0.05).toFixed(2)),
        criterio_3: parseFloat((Number(data.criterio_1) * 0.05).toFixed(2)),
        criterio_4: parseFloat((Number(data.criterio_1) * 0.4).toFixed(2)),
        criterio_5: parseFloat((Number(data.criterio_1) * 0.05).toFixed(2)),
      };

      const BodyToSend = {
        rut: localStorage.getItem('userRut'),
        grupo_id: group_id,
        puntuaciones: [
          formatedData.criterio_1,
          formatedData.criterio_2,
          formatedData.criterio_3,
          formatedData.criterio_4,
          formatedData.criterio_5,
        ]
      }

      const sumaCriterios = Object.values(formatedData).reduce(
        (acc, currentValue) => acc + currentValue,
        0
      );
    
      console.log('Suma de criterios:', Number(sumaCriterios.toFixed(2)));
      console.log(BodyToSend);

      try {
        const response = await axios.post('http://localhost:3000/evaluaciones', BodyToSend);
        if (response.status === 201) {
          alert(`${response.data.mensaje} \nSeras redireccionado al inicio`)
          navigate('/home');
        }
      } catch (error) {
        if (error.response.status === 400 || error.response.status === 500) {
          alert(error.response.data.mensaje)
        }
      }

      
    } else {
      console.log(data);
      alert("Por favor ingrese un valor valido en la evaluacion");
    }
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
          isSmallScreen ? " items-center m-3" : "mr-10 mb-5 ml-10 mt-5"
        }`}
      >
        <span className="title-evaluation font-bold text-2xl">Evaluación</span>
        <div className="evaluation-form-container mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="criterios flex items-center justify-between mb-2">
              <div className=" flex justify-around items-center">
                <span className="font-semibold text-xl mr-1">1.-</span>
                <label
                  htmlFor="c1"
                  className="primer-criterio font-semibold text-xl"
                >
                  Creatividad - animación, Video incluye portada con nombre de
                  integrantes y universidad, introducción, objetivos,
                  descripción experiencia, demostración práctica y con
                  ecuaciones, análisis, conclusiones
                </label>
              </div>
              <div className="criterio-options">
                <select
                  name="puntuacion"
                  id="c1"
                  className="select-container"
                  defaultValue={"--"}
                  {...register("criterio_1", { required: true })}
                >
                  <option value="--">--</option>
                  <option value={7}>Excelente</option>
                  <option value={6}>Bueno</option>
                  <option value={5}>Aceptable</option>
                  <option value={4}>Insuficiente</option>
                </select>
              </div>
            </div>
            <div className="criterios flex items-center justify-between mb-2">
              <div className=" flex justify-around items-center">
                <span className="font-semibold text-xl mr-1">2.-</span>
                <label
                  htmlFor="c2"
                  className="segundo-criterio font-semibold text-xl"
                >
                  Usa voz clara, con volumen apropiado, sin uso de muletillas y
                  con buen ritmo, de modo que se pueda oír y seguir. Además, el
                  orden de sus ideas sigue una lógica clara. No lee de apuntes.
                </label>
              </div>
              <div className="criterio-options">
                <select
                  name="puntuacion"
                  id="c2"
                  className="select-container"
                  defaultValue={"--"}
                  {...register("criterio_2", { required: true })}
                >
                  <option value="--">--</option>
                  <option value={7}>Excelente</option>
                  <option value={6}>Bueno</option>
                  <option value={5}>Aceptable</option>
                  <option value={4}>Insuficiente</option>
                </select>
              </div>
            </div>
            <div className="criterios flex items-center justify-between mb-2">
              <div className=" flex justify-around items-center">
                <span className="font-semibold text-xl mr-1">3.-</span>
                <label
                  htmlFor="c3"
                  className="tercer-criterio font-semibold text-xl"
                >
                  Material reciclado, reutilizado
                </label>
              </div>
              <div className="criterio-options">
                <select
                  name="puntuacion"
                  id="c3"
                  className="select-container"
                  defaultValue={"--"}
                  {...register("criterio_3", { required: true })}
                >
                  <option value="--">--</option>
                  <option value={7}>Excelente</option>
                  <option value={6}>Bueno</option>
                  <option value={5}>Aceptable</option>
                  <option value={4}>Insuficiente</option>
                </select>
              </div>
            </div>
            <div className="criterios flex items-center justify-between mb-2">
              <div className=" flex justify-around items-center">
                <span className="font-semibold text-xl mr-1">4.-</span>
                <label
                  htmlFor="c4"
                  className="cuarto-criterio font-semibold text-xl"
                >
                  La demostración y aplicación de las ecuaciones pudo realizarse
                  de acuerdo con los objetivos con posibilidad de replicarse a
                  nivel real y como ejemplo pedagógico.
                </label>
              </div>
              <div className="criterio-options">
                <select
                  name="puntuacion"
                  id="c4"
                  className="select-container"
                  defaultValue={"--"}
                  {...register("criterio_4", { required: true })}
                >
                  <option value="--">--</option>
                  <option value={7}>Excelente</option>
                  <option value={6}>Bueno</option>
                  <option value={5}>Aceptable</option>
                  <option value={4}>Insuficiente</option>
                </select>
              </div>
            </div>
            <div className="criterios flex items-center justify-between mb-2">
              <div className=" flex justify-around items-center">
                <span className="font-semibold text-xl mr-1">5.-</span>
                <label
                  htmlFor="c5"
                  className="quinto-criterio font-semibold text-xl"
                >
                  El tiempo total de presentación no es exagerado
                </label>
              </div>
              <div className="criterio-options">
                <select
                  name="puntuacion"
                  id="c5"
                  className="select-container"
                  defaultValue={"--"}
                  {...register("criterio_5", { required: true })}
                >
                  <option value="--">--</option>
                  <option value={7}>Excelente</option>
                  <option value={6}>Bueno</option>
                  <option value={5}>Aceptable</option>
                  <option value={4}>Insuficiente</option>
                </select>
              </div>
            </div>
            <div className="submit-evaluation flex justify-center mt-3">
              <button
                type="submit"
                className="submit-evaluation-btn rounded-full"
              >
                <span className="font-semibold text-amber-950 text-lg">
                  Enviar Evaluación
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
