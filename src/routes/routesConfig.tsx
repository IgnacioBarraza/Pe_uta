import { HomePage } from "../shared/homepage";
import Projects from "../shared/projects";
import ProjectsBySubject from "../shared/projectsbysubject";
import ProjectsEvaluated from "../shared/projectsevaluated";
import EvaluateProject from "../shared/evaluateprojects";
import LogIn from "../auth/login";
import ProtectedRoute from "./protectedRoute";
import { MainPage } from "../shared/MainPage/mainpage";

const routes = [
  {
    path: "/",
    component: <LogIn />,
  },
  {
    path: "/home",
    component: <HomePage />,
    protection: <ProtectedRoute roles={["user", "admin"]} />,
    routes: [
      {
        path: "/home",
        component: <MainPage />,
        protection: <ProtectedRoute roles={["user", "admin"]} />,
      },
      {
        path: "/home/projects",
        component: <Projects />,
        protection: <ProtectedRoute roles={["user", "admin"]} />,
        routes: [
          {
            path: "/home/projects/:subject_name/:id",
            component: <ProjectsBySubject />,
            protection: <ProtectedRoute roles={["user", "admin"]} />,
          },
        ],
      },

      {
        path: "/home/project/:id",
        component: <EvaluateProject />,
        protection: <ProtectedRoute roles={["user", "admin"]} />,
      },
      {
        path: "/home/evaluated",
        component: <ProjectsEvaluated />,
        protection: <ProtectedRoute roles={["user", "admin"]} />,
      },
    ],
  },
];

export default routes;
