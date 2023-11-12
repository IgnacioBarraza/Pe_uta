/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { useState } from "react";
import './signup.css'
import  Modal   from "../../components/SignUpAdvice/modal";

type FormData = {
  nombre: string,
  apellido: string
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [modal, setModal] = useState(false);
  const [registeredName, setRegisteredName] = useState("");

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  const showModal = () => setModal(!modal);

  const onSubmit = (data: FormData) => {
    console.log(data);
    setRegisteredName(data.nombre);
    showModal();
  };

  return (
    <>
      <div className="flex justify-center signup">
        <div className="bg-stone-300 self-center rounded-xl">
          <div className="bg-stone-400 m-4 signup-container rounded-lg">
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
                <div className="name-input flex flex-col m-auto pt-16 text-black font-semibold">
                  <label htmlFor="name">Nombre</label>
                  <input type="text" name="name-input" id="name" className="h-8 rounded-lg"
                  {...register("nombre", {required: true})
                  }/>
                  {errors.nombre && <span className="text-red-500 font-bold">Este campo es obligatorio</span> }
                </div>
                <div className="lastName-input flex flex-col m-auto pt-14 font-semibold text-black">
                  <label htmlFor="lastName">Apellido</label>
                  <input type="text" name="lastName-input" id="lastName" className="h-8 rounded-lg" {...register("apellido", {required: true})}/>
                  {errors.apellido && <span className="text-red-500 font-bold">Este campo es obligatorio</span>}
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
              <Modal show={modal} close={showModal} name={registeredName}/>
              </form>
              <div className="flex justify-center items-center copyright">
                <span className="font-bold">
                  © {currentYear} Feria de Ciencia y Tecnología
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
