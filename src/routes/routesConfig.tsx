import { Layout } from "../shared/layout";
import Projects from "../shared/projects";
import ProjectsEvaluated from "../shared/projectsevaluated";
import EvaluateProject from "../shared/evaluateprojects";
import { LogIn } from "../auth/login";
import ProtectedRoute from "./protectedRoute";
import { Home } from "../shared/MainPage/mainpage";
import { Page404 } from "../shared/page404";
import { Register } from "@/auth/register";

const routes = [
  {
    path: "/login",
    component: <LogIn />,
  },
  {
    path: "/register",
    component: <Register />
  },
  {
    path: "/inicio",
    component: <Layout />,
    routes: [
      {
        path: "",
        component: <Home />,
      },
      {
        path: "proyectos",
        component: <Projects />
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
        path: "evaluar",
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
