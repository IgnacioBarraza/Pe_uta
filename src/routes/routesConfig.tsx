import { Layout } from "@/shared/layout";
import { Projects } from "@/shared/project/projects";
import ProjectsEvaluated from "../shared/projectsevaluated";
import { Evaluate } from "@/shared/evaluate/evaluate";
import { LogIn } from "@/auth/login";
import ProtectedRoute from "./protectedRoute";
import { Home } from "@/shared/Home/home";
import { Page404 } from "@/shared/page404";
import { Register } from "@/auth/register";
import Admin from "@/shared/admin/admin";

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
        component: <Projects />,
      },
      {
        path: "evaluar",
        component: <Evaluate />
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
    path: "/admin",
    component: <Admin />
  },
  {
    path: "*",
    component: <Page404 />,
  },
];

export default routes;
