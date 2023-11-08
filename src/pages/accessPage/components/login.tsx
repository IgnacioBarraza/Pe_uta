import "./login.css";

export default function LogIn() {
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
              <span className="">
                Feria de ciencias “Triunfando en el conocimiento” Universidad de
                Tarapacá
              </span>
              <img src="src/assets/feria_de_ciencias_logo.svg" alt="Feria de ciencias logo" className="feria-icon p-1"/>
            </div>
            <div className="form-container"></div>
          </div>
        </div>
      </div>
    </>
  );
}
