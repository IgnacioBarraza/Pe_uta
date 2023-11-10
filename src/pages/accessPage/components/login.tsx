/* eslint-disable @typescript-eslint/no-unused-vars */
import Calendario from "../../../components/Calendar/calendar";
import "./login.css";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export default function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex justify-center login">
        <div className="bg-stone-300 self-center rounded-xl main-container grid grid-flow-col">
          <div className="bg-stone-400 m-4 login-container rounded-lg row-span-4">
            <div className="science-expo flex justify-center">
              <img
                src="src\assets\uta_logo.svg"
                alt="Uta logo"
                className="uta-icon p-2"
              />
              <div className="title-text text-white pt-2 pl-5 pr-5">
                <span>Feria de ciencias</span>
                <span>“Triunfando en el conocimiento”</span>
                <span>Universidad de Tarapacá</span>
              </div>
              <img
                src="src/assets/feria_de_ciencias_logo.jpg"
                alt="Feria de ciencias logo"
                className="feria-icon p-1"
              />
            </div>
            <div className="form-container">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="rut-input flex flex-col m-auto pt-16 text-black font-semibold">
                  <label htmlFor="rut">Rut</label>
                  <input
                    type="text"
                    name="rut-input"
                    id="rut"
                    className="h-8 rounded-lg"
                  />
                </div>
                <div className="password-input flex flex-col m-auto pt-14 font-semibold text-black">
                  <label htmlFor="pass">Contraseña</label>
                  <input
                    type="password"
                    name="pass-input"
                    id="pass"
                    className="h-8 rounded-lg"
                  />
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
          <div className="organize col-span-2 mt-4 bg-stone-400 mb-2">
            <div className="organize-container">
              <div className="organize-header flex items-center flex-wrap">
                <img
                  src="src/assets/organize_icon.svg"
                  alt="Organize icon"
                  className="organize-icon p-3 ml-28"
                />
                <span className="ml-9 font-medium text-2xl text-white">
                  Organiza
                </span>
              </div>
              <div className="flex gap-8 justify-center mt-6">
                <img src="src/assets/icin_logo.png" alt="ICIN logo" />
                <img src="src/assets/ici_logo.png" alt="ICI logo" />
                <img src="src/assets/explora_logo.png" alt="EXPLORA logo" />
                <img src="src/assets/ice_logo.png" alt="ICE logo" />
              </div>
            </div>
          </div>
          <div className="upcoming-dates bg-stone-400 row-span-2 col-span-2">
            <div className="dates-container">
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
          <div className="credits bg-stone-400">
            <div className="credits-container h-full flex justify-center items-center">
              <span className="font-medium text-sm">
                Desarrollado por Danny e Ignacio - ICIN
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
