import "./homepage.css";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";

export default function HomePage() {
  const rut = localStorage.getItem("userRut");

  return (
    <>
      <div className="fixed left-0 right-0 z-10">
        <Navbar />
      </div>
        <div className="page-container bg-stone-100">
          <div className="home-container bg-stone-400">
            <div className="welcome flex justify-center items-center ">
              <span className="font-semibold text-2xl">
                ¡Bienvenido/a, {rut} 👋
              </span>
            </div>
            <div className="">

            </div>
            <div></div>
          </div>
        </div>
      <div className="fixed left-0 right-0 bottom-0">
        <Footer />
      </div>
    </>
  );
}
