import { Link } from "react-router-dom";
import "../../../styles/mainpage.css";

const ProjectButton = ({ to, label, imgClass, subject }) => (
  <div className="project-btn-container bg-stone-100 mx-4 mb-2">
    <div className="project-btn flex flex-col items-center">
      <Link to={to}>
        <button aria-label={label}>
          <div className={`${imgClass} bg-no-repeat bg-cover bg-center rounded-t-lg w-[81vw] lg:w-[550px]`}></div>
          <div className="flex justify-center items-center h-[70px]">
            <span className="font-semibold text-xl">{subject}</span>
          </div>
        </button>
      </Link>
    </div>
  </div>
);

export default ProjectButton;
