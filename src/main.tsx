import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Footer from "./components/Footer/footer.tsx";
import Navbar from "./components/NavBar/navbar.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-1">
        <App />
      </main>
      <Footer />
    </div>
  </React.StrictMode>
);
