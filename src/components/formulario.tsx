import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  const { register, handleSubmit } = useForm<FormData>();

  const handleResponsive = () => {
    setIsSmallScreen(window.innerWidth <= 1050);
  };

  const navigate = useNavigate();

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
        rut: localStorage.getItem("userRut"),
        grupo_id: group_id,
        puntuaciones: [
          formatedData.criterio_1,
          formatedData.criterio_2,
          formatedData.criterio_3,
          formatedData.criterio_4,
          formatedData.criterio_5,
        ],
      };

      if (JSON.parse(localStorage.getItem("proyectosEvaluados")) != null) {
        const gruposYaEvaluados = JSON.parse(
          localStorage.getItem("proyectosEvaluados")
        );
        const nuevoGrupoEvaluado = group_id;
        gruposYaEvaluados.push({ grupo_id: Number(nuevoGrupoEvaluado) });
        localStorage.setItem(
          "proyectosEvaluados",
          JSON.stringify(gruposYaEvaluados)
        );
      } else {
        const proyectoEvaluado = [
          {
            grupo_id: Number(group_id),
          },
        ];
        localStorage.setItem(
          "proyectosEvaluados",
          JSON.stringify(proyectoEvaluado)
        );
      }

      try {
        const response = await axios.post(
          "https://bak.torresproject.com/evaluaciones",
          BodyToSend
        );
        if (response.status === 201) {
          alert(
            `${response.data.mensaje} \nSeras redireccionado a la pagina de Inicio`
          );
          navigate("/home");
        }
      } catch (error) {
        if (error.response.status === 400 || error.response.status === 500) {
          alert(
            `${error.response.data.mensaje}\nSeras redireccionado a la pagina de Inicio`
          );
          navigate("/home");
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
            <div className="h-auto lg:h-[70px] w-full bg-gray-100 rounded-lg p-3 flex items-center justify-between mb-2">
              <div className=" flex justify-around items-center">
                <span className="font-semibold text-xl mr-1">1.-</span>
                <label
                  htmlFor="c1"
                  className="w-full lg:w-[95%] font-semibold text-xl"
                >
                  Creatividad - animación, video incluye portada con nombre de
                  integrantes y universidad, introducción, objetivos,
                  descripción experiencia, demostración práctica y con
                  ecuaciones, análisis, conclusiones
                </label>
              </div>
              <div className="criterio-options">
                <select
                  name="puntuacion"
                  id="c1"
                  className="p-3 text-base border-solid border-2 border-gray-300 rounded-md appearance-none outline-none"
                  defaultValue={"--"}
                  {...register("criterio_1", { required: true })}
                  aria-describedby="criterio 1 evaluación"
                >
                  <option value="--">--</option>
                  <option value={7}>Excelente</option>
                  <option value={6}>Bueno</option>
                  <option value={5}>Aceptable</option>
                  <option value={4}>Insuficiente</option>
                </select>
              </div>
            </div>
            <div className="h-auto lg:h-[70px] w-full bg-gray-100 rounded-lg p-3 flex items-center justify-between mb-2">
              <div className=" flex justify-around items-center">
                <span className="font-semibold text-xl mr-1">2.-</span>
                <label
                  htmlFor="c2"
                  className="w-full lg:w-[95%] font-semibold text-xl"
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
                  className="p-3 text-base border-solid border-2 border-gray-300 rounded-md appearance-none outline-none"
                  defaultValue={"--"}
                  {...register("criterio_2", { required: true })}
                  aria-describedby="criterio 2 evaluación"
                >
                  <option value="--">--</option>
                  <option value={7}>Excelente</option>
                  <option value={6}>Bueno</option>
                  <option value={5}>Aceptable</option>
                  <option value={4}>Insuficiente</option>
                </select>
              </div>
            </div>
            <div className="h-auto lg:h-[70px] w-full bg-gray-100 rounded-lg p-3 flex items-center justify-between mb-2">
              <div className="flex justify-around items-center w-full">
                <span className="font-semibold text-xl mr-1">3.-</span>
                <label
                  htmlFor="c3"
                  className="w-full lg:w-[95%] font-semibold text-xl"
                >
                  Material reciclado, reutilizado, biodegradable
                </label>
              </div>
              <div className="criterio-options">
                <select
                  name="puntuacion"
                  id="c3"
                  className="p-3 text-base border-solid border-2 border-gray-300 rounded-md appearance-none outline-none"
                  defaultValue={"--"}
                  {...register("criterio_3", { required: true })}
                  aria-describedby="criterio 3 evaluación"
                >
                  <option value="--">--</option>
                  <option value={7}>Excelente</option>
                  <option value={6}>Bueno</option>
                  <option value={5}>Aceptable</option>
                  <option value={4}>Insuficiente</option>
                </select>
              </div>
            </div>
            <div className="h-auto lg:h-[70px] w-full bg-gray-100 rounded-lg p-3 flex items-center justify-between mb-2">
              <div className=" flex justify-around items-center">
                <span className="font-semibold text-xl mr-1">4.-</span>
                <label
                  htmlFor="c4"
                  className="w-full lg:w-[95%] font-semibold text-xl"
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
                  className="p-3 text-base border-solid border-2 border-gray-300 rounded-md appearance-none outline-none"
                  defaultValue={"--"}
                  {...register("criterio_4", { required: true })}
                  aria-describedby="criterio 4 evaluación"
                >
                  <option value="--">--</option>
                  <option value={7}>Excelente</option>
                  <option value={6}>Bueno</option>
                  <option value={5}>Aceptable</option>
                  <option value={4}>Insuficiente</option>
                </select>
              </div>
            </div>
            <div className="h-auto lg:h-[70px] w-full bg-gray-100 rounded-lg p-3 flex items-center justify-between mb-2">
              <div className=" flex justify-around items-center w-full">
                <span className="font-semibold text-xl mr-1">5.-</span>
                <label
                  htmlFor="c5"
                  className="w-full lg:w-[95%] font-semibold text-xl"
                >
                  El tiempo total de presentación no es exagerado
                </label>
              </div>
              <div className="criterio-options">
                <select
                  name="puntuacion"
                  id="c5"
                  className="p-3 text-base border-solid border-2 border-gray-300 rounded-md appearance-none outline-none"
                  defaultValue={"--"}
                  {...register("criterio_5", { required: true })}
                  aria-describedby="criterio 5 evaluación"
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
                className="rounded-full w-52 h-12 bg-gray-100"
              >
                <span className="font-semibold text-lg">
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
