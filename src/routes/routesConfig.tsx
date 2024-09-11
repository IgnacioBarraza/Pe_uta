import { Layout } from "@/shared/layout";
import { Projects } from "@/shared/project/projects";
import ProjectsEvaluated from "../shared/projectsevaluated";
import EvaluateProject from "../shared/evaluateprojects";
import { LogIn } from "@/auth/login";
import ProtectedRoute from "./protectedRoute";
import { Home } from "@/shared/Home/home";
import { Page404 } from "@/shared/page404";
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
        path: "evaluar/:project_name/:id",
        component: (
          <ProtectedRoute roles={["user", "admin"]}>
            <EvaluateProject />
          </ProtectedRoute>
        ),
      },
      {
        path: "evaluados",
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
