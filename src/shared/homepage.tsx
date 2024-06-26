import "../styles/homepage.css";
import Navbar from "../components/NavBar/navbar";
import Footer from "../components/Footer/footer";
import { Outlet } from "react-router-dom";

export const HomePage = () =>  {

  return (
    <>
      <Navbar />
      <div
        className="flex flex-col bg-dark-gray bg-cover bg-center overflow-auto p-1 lg:p-2.5 w-full h-[85vh]"
        aria-live="polite"
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
