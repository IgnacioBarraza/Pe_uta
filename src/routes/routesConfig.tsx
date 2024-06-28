import { HomePage } from "../shared/homepage";
import Projects from "../shared/projects";
import ProjectsBySubject from "../shared/projectsbysubject";
import ProjectsEvaluated from "../shared/projectsevaluated";
import EvaluateProject from "../shared/evaluateprojects";
import { LogIn } from "../auth/login";
import ProtectedRoute from "./protectedRoute";
import { MainPage } from "../shared/MainPage/mainpage";
import { Page404 } from "../shared/page404";

const routes = [
  {
    path: "/",
    component: <LogIn />,
  },
  {
    path: "/home",
    component: (
      <ProtectedRoute roles={["user", "admin"]}>
        <HomePage />
      </ProtectedRoute>
    ),
    routes: [
      {
        path: "",
        component: <MainPage />,
      },
      {
        path: "projects",
        component: (
          <ProtectedRoute roles={["user", "admin"]}>
            <Projects />
          </ProtectedRoute>
        ),
      },
      {
        path: "projects/:subject_name/:id",
        component: (
          <ProtectedRoute roles={["user", "admin"]}>
            <ProjectsBySubject />
          </ProtectedRoute>
        ),
      },
      {
        path: "project/:project_name/:id",
        component: (
          <ProtectedRoute roles={["user", "admin"]}>
            <EvaluateProject />
          </ProtectedRoute>
        ),
      },
      {
        path: "evaluated",
        component: (
          <ProtectedRoute roles={["user", "admin"]}>
            <ProjectsEvaluated />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    component: <Page404 />,
  },
];

export default routes;
