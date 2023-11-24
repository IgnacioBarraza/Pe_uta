/* eslint-disable react-hooks/exhaustive-deps */
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import "./recover.css";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

type FormData = {
  tipo_id: number;
  rut: string;
  password: string;
};

export default function RecoverPassword({ show, close }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const formatedData: FormData = {
        tipo_id: parseInt(localStorage.getItem("tipoId")),
        rut: data.rut,
        password: data.password,
      };
      if (parseInt(localStorage.getItem("tipoId")) === 1) {
        const response = await axios.post(
          "https://bak.torresproject.com/update-user",
          formatedData
        );
        console.log(response.statusText);
      } else {
        alert("Solo usuarios administradores pueden actualizar la contraseña");
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        console.log(error);
        alert(error.response.data.mensaje);
      }
    }
    close();
  };

  return (
    <>
      {show ? (
        <div
          className="modalContainer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabIndex={-1}
        >
          <div className="modal">
            <header className="modal_header">
              <h2
                id="modal-title"
                className="modal_header-title font-semibold ml-52"
              >
                Recuperar contraseña
              </h2>
              <button
                className="close"
                onClick={() => close()}
                aria-label="Cerrar modal"
              >
                <FontAwesomeIcon icon={faXmarkCircle} />
              </button>
            </header>
            <main className="modal_content flex flex-col">
              <div className="form-container">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  aria-labelledby="login-form-heading"
                >
                  <div className="rut-input flex flex-col m-auto pt-16 text-black font-semibold">
                    <label htmlFor="rut">Rut</label>
                    <input
                      type="text"
                      name="rut-input"
                      id="rut"
                      className="h-8 rounded-lg"
                      placeholder="  Rut sin puntos, con guion"
                      {...register("rut", {
                        required: "Este campo es obligatorio",
                        pattern: {
                          value: /^(\d{1,2}(\d{3}){2}-[\dkK])$/,
                          message: "Rut invalido",
                        },
                      })}
                    />
                    {errors.rut && (
                      <span className="text-red-500 font-bold">
                        {errors.rut.message}
                      </span>
                    )}
                  </div>
                  <div className="password-input flex flex-col m-auto pt-14 font-semibold text-black">
                    <label htmlFor="pass">Contraseña</label>
                    <input
                      type="password"
                      name="pass-input"
                      id="pass"
                      className="h-8 rounded-lg"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span className="text-red-500 font-bold">
                        Este campo es obligatorio
                      </span>
                    )}
                  </div>
                  <div className="flex justify-center pt-20">
                    <button
                      type="submit"
                      className="bg-stone-300 submit-btn rounded-lg"
                    >
                      <span className="text-black font-semibold text-lg">
                        Enviar
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </main>
          </div>
        </div>
      ) : null}
    </>
  );
}
