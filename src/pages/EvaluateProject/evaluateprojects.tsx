import { useEffect, useState } from "react";
import Footer from "../../components/Footer/footer";
import Navbar from "../../components/NavBar/navbar";

export default function EvaluateProject() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1050);

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
      <Navbar />
      <div className="page-container">
        <div
          className={`welcome flex justify-center items-center ${
            isSmallScreen ? "" : "mb-3"
          }`}
        >
          <h1 className="font-semibold text-2xl">Proyecto "{}"</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}
