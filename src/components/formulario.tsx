import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EvaluateData } from "@/utils/utils";

export default function Formulario({ group_id }) {
  const { register, handleSubmit } = useForm<EvaluateData>();

  const navigate = useNavigate();

  const onSubmit = async (data: EvaluateData) => {
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

  return (
    <>
      
    </>
  );
}
