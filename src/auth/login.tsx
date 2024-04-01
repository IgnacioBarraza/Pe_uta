/* eslint-disable react-hooks/exhaustive-deps */
import Calendario from "../components/Calendar/calendar";
import Modal from "../components/LogInAdvice/modal";
import ErrorModal from "../components/LogInError/errormodal";
import "../styles/login.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { OrganizeModal } from "../components/organize-modal";
import { Box } from "@chakra-ui/react";

type FormData = {
  rut: string;
  password: string;
};

export default function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [registeredRut, setRegisteredRut] = useState("");
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1050);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const showModal = () => setModal(!modal);
  const showErrorModal = () => setErrorModal(!errorModal);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/registro-o-inicio-sesion",
        data
      );
      if (response.status === 201) {
        console.log(response.statusText);
        setRegisteredRut(data.rut);
        showModal();
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRut", response.data.rut);
        localStorage.setItem("userId", response.data.userID);
        localStorage.setItem("tipoId", response.data.tipoID);
      }
      if (response.status === 200) {
        navigate("/home");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRut", response.data.rut);
        localStorage.setItem("userId", response.data.userID);
        localStorage.setItem(
          "proyectosEvaluados",
          JSON.stringify(response.data.gruposEvaluados)
        );
        localStorage.setItem("tipoId", response.data.tipoID);
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        setError(error.response.data.mensaje);
        showErrorModal();
      }
    }
  };

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
      <Box bgImage={'url(/fondo_login.jpg)'}>
        <div className="flex justify-center login">
          <div
            className={`bg-stone-300 self-center ${
              isSmallScreen
                ? "flex flex-col items-center main-container-mobile"
                : "grid grid-flow-col main-container rounded-xl"
            }`}
          >
            <div
              className={`bg-stone-400 ${
                isSmallScreen
                  ? "login-container-mobile mb-2 m-2"
                  : "login-container row-span-4 rounded-lg m-4"
              }`}
              role="region"
              aria-label="Login Container"
            >
              <div className="science-expo flex justify-center">
                <img
                  src="src\assets\uta_logo.svg"
                  alt="Uta logo"
                  className={`uta-icon ${isSmallScreen ? "p-3" : "p-2"}`}
                />
                <div
                  className={`text-white ${
                    isSmallScreen
                      ? "title-text-mobile"
                      : "title-text pr-5 pt-2 pl-5"
                  }`}
                >
                  <span>Feria de ciencias</span>
                  <span>“Triunfando en el conocimiento”</span>
                  <span>Universidad de Tarapacá</span>
                </div>
                <img
                  src="src/assets/feria_de_ciencias_logo.jpg"
                  alt="Feria de ciencias logo"
                  className={`feria-icon ${isSmallScreen ? "p-3" : "p-2"}`}
                />
              </div>
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
                        Ingresar
                      </span>
                    </button>
                  </div>
                </form>
                <div className="flex justify-center items-center copyright">
                  <span className="font-bold">
                    © {currentYear} Feria de Ciencia y Tecnología
                  </span>
                </div>
              </div>
            </div>
            <div
              className={` ${
                isSmallScreen
                  ? "mb-2 organize-mobile"
                  : "organize col-span-2 mt-4 mb-2"
              }`}
            >
              <OrganizeModal />
            </div>
            <div
              className={` ${
                isSmallScreen
                  ? "upcoming-dates-mobile"
                  : "upcoming-dates row-span-2 col-span-2"
              }`}
            >
              <div
                className={`bg-stone-400 ${
                  isSmallScreen
                    ? "m-1 dates-container-mobile"
                    : "dates-container"
                }`}
              >
                <div className="date-header flex justify-center items-center">
                  <img
                    src="src/assets/upcoming_dates.svg"
                    alt="Organize icon"
                    className="organize-icon p-3"
                  />
                  <span className="font-medium text-2xl text-white">
                    Proximas Fechas
                  </span>
                </div>
                <div className="important-day text-center mt-1 flex flex-col mb-2">
                  <span className="font-bold">Lugar: UTA Sede La Tirana</span>
                  <span className="font-bold">
                    Fecha: Viernes 24 de Noviembre {currentYear} - 09:00hrs
                  </span>
                </div>
                <Calendario year={currentYear} month={currentMonth} />
              </div>
            </div>
          </div>
        </div>
        <Modal show={modal} close={showModal} name={registeredRut} />
        <ErrorModal show={errorModal} close={showErrorModal} error={error} />
      </Box>
    </>
  );
}
