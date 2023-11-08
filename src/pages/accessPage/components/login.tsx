/* eslint-disable @typescript-eslint/no-unused-vars */
import "./login.css";
import { useForm } from "react-hook-form";


type FormData = {
  email: string,
  password: string
}

export default function LogIn() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  }

  return (
    <>
      <div className="flex justify-center login">
        <div className="bg-stone-300 self-center rounded-xl main-container">
          <div className="bg-stone-400 m-4 login-container rounded-lg">
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
                src="src/assets/feria_de_ciencias_logo.svg"
                alt="Feria de ciencias logo"
                className="feria-icon p-1"
              />
            </div>
            <div className="form-container">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="rut-input flex flex-col m-auto p-10">
                  <label htmlFor="rut">Rut</label>
                  <input type="text" name="rut-input" id="rut" className=""/>
                </div>
                <div className="password-input flex flex-col m-auto">
                  <label htmlFor="pass">Contraseña</label>
                  <input type="password" name="pass-input" id="pass" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
