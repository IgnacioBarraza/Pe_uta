import {Calendario} from "../components/Calendar/calendar";
import {Modal} from "../components/LogInAdvice/modal";
import {ErrorModal} from "../components/LogInError/errormodal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { OrganizeModal } from "../components/organize-modal";
import { Box } from "@chakra-ui/react";
import { useProps } from "../hooks/useProps";
import { useToast } from "@chakra-ui/react";

type FormData = {
  rut: string;
  password: string;
  name?: string
};

export const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { setUserType, setTokenData, setUserName, setUserId, setUserRut, userName } = useProps()
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [newUser, setNewUser] =  useState(false)

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const showModal = () => setModal(!modal);
  const showErrorModal = () => setErrorModal(!errorModal);
  const navigate = useNavigate();
  const toast = useToast()

  const handleLoginOrRegister = (data: FormData) => {
    if (!data.name && !newUser) {
      handleLogin(data)
    } else {
      handleRegister(data)
    }
  };

  const handleLogin = async (loginData: FormData) => {
    try {
      const res = await axios.post(
        "https://bak.torresproject.com/login",
        loginData
      );
      const {status, data } = res
      if (status === 200) {
        const { token, userID, userName, tipoID, rut, mensaje, gruposEvaluados } = data;
        localStorage.setItem(
          "proyectosEvaluados",
          JSON.stringify(gruposEvaluados)
        );
        saveUserData(token, userID, userName, tipoID, rut)
        navigate("/home");
        toastNotification(mensaje)
      }
    } catch (error) {
      if (error.response.status === 404) {
        setNewUser(true)
      }
      if (error.response.status === 401) {
        setError(error.response.data.mensaje);
        showErrorModal();
      }
    }
  }

  const handleRegister = async (registerData: FormData) => {
    try {
      const res = await axios.post(
        "https://bak.torresproject.com/registro",
        registerData
      );
      const {status, data } = res
      if (status === 201) {
        const { token, userID, userName, tipoID, rut, mensaje } = data;
        saveUserData(token, userID, userName, tipoID, rut)
        showModal()
        toastNotification(mensaje)
      }
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.mensaje);
        showErrorModal();
      }
    }
  }

  const saveUserData = (token: string, userID: string, username: string, tipoID: string, rut: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userRut", rut);
    localStorage.setItem("userType", tipoID);
    localStorage.setItem("tipoId", userID);
    localStorage.setItem("userName", username)
    setUserType(tipoID);
    setTokenData(token);
    setUserName(username);
    setUserId(userID);
    setUserRut(rut)
  };

  const toastNotification = (message: string) => {
    toast({
      title: message,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <>
      <Box bgImage={"url(/fondo_login.jpg)"}>
        <div className="flex justify-center login w-screen h-screen">
          <div className="bg-gray-100 self-center flex flex-col items-center w-screen h-full lg:w-[1035px] lg:h-[640px] lg:grid lg:grid-flow-col lg:rounded-xl">
            <div
              className="bg-davy-gray mb-2 m-2 w-[98%] rounded-xl lg:m-4 lg:row-span-4 lg:w-[515px] lg:h-[610px]"
              role="region"
              aria-label="Login Container"
            >
              <div className="w-full h-[100px] rounded-t-lg bg-dark-gray flex items-center justify-around">
                <img
                  src="/uta_logo.svg"
                  alt="Uta logo"
                  className="h-[100px] p-3 lg:p-2"
                />
                <div
                  className="text-white flex flex-col justify-center items-center text-lg font-semibold"
                >
                  <span>Feria de divulgación universitaria</span>
                  <span>Universidad de Tarapacá</span>
                </div>
                <div className="h-[100px] w-[56px] p-2"></div>
              </div>
              <div className="flex flex-col justify-around h-[510px]">
                <form
                  onSubmit={handleSubmit(handleLoginOrRegister)}
                  aria-labelledby="login-form-heading"
                >
                  {newUser && (
                    <div className="w-80 font-roboto flex flex-col m-auto pt-10 font-semibold">
                      <label htmlFor="nombre" className="text-white">Nombre</label>
                      <input
                        type="text"
                        name="name-input"
                        id="name"
                        className="h-8 rounded-lg pl-2"
                        placeholder="Nombre"
                        {...register("name", {
                          required: "Este campo es obligatorio",
                        })}
                      />
                      {errors.name && (
                        <span className="text-red-500 font-bold">
                          {errors.name.message}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="w-80 font-roboto flex flex-col m-auto pt-10 font-semibold">
                    <label htmlFor="rut" className="text-white">Rut</label>
                    <input
                      type="text"
                      name="rut-input"
                      id="rut"
                      className="h-8 rounded-lg pl-2"
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
                  <div className="w-80 font-roboto flex flex-col m-auto pt-10 font-semibold">
                    <label htmlFor="pass" className="text-white">Contraseña</label>
                    <input
                      type="password"
                      name="pass-input"
                      id="pass"
                      className="h-8 rounded-lg pl-2"
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
                      className="bg-stone-100 rounded-lg w-40 h-12"
                    >
                      <span className="text-black font-semibold text-lg">
                        Ingresar
                      </span>
                    </button>
                  </div>
                </form>
                <div className="flex justify-center items-center copyright">
                  <span className="font-bold text-white">
                    © {currentYear} Feria de Ciencia y Tecnología
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-2 w-[98%] lg:w-[460px] lg:h-[180px] lg:col-span-2 lg:mt-4">
              <OrganizeModal />
            </div>
            <div className="w-[98%] lg:row-span-2 lg:col-span-2 lg:w-[460px] lg:h-[422px] mb-2">
              <div
                className="bg-davy-gray rounded-lg h-[422px] mb-2"
              >
                <div className="w-full h-[60px] rounded-t-lg bg-dark-gray flex justify-center items-center">
                  <img
                    src="/upcoming_dates.svg"
                    alt="Organize icon"
                    className="p-3"
                  />
                  <span className="font-medium text-2xl text-white">
                    Proximas Fechas
                  </span>
                </div>
                <div className="text-center mt-1 flex flex-col mb-2 text-white">
                  <span className="font-bold">Lugar: UTA Sede La Tirana</span>
                  <span className="font-bold">
                    Fecha: Viernes 28 de Junio {currentYear} - 09:00hrs
                  </span>
                </div>
                <Calendario year={currentYear} month={currentMonth} />
              </div>
            </div>
          </div>
        </div>
        <Modal show={modal} close={showModal} name={userName} />
        <ErrorModal show={errorModal} close={showErrorModal} error={error} />
      </Box>
    </>
  );
}
