import { Layout } from "@/shared/layout";
import { Projects } from "@/shared/project/projects";
import Evaluate from "@/shared/evaluate/evaluate";
import { LogIn } from "@/auth/login";
import ProtectedRoute from "./protectedRoute";
import { Home } from "@/shared/Home/home";
import { Page404 } from "@/shared/page404";
import { Register } from "@/auth/register";
import Admin from "@/shared/admin/admin";
import { Navigate } from "react-router-dom";
import Evaluated from "../shared/evaluated/evaluated";

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
        component: (
          // <ProtectedRoute roles={["user", "admin"]}>
            <Evaluate />
          // </ProtectedRoute>
        )
      },
      {
        path: "evaluados",
        component: (
          // <ProtectedRoute roles={["user", "admin"]}>
            <Evaluated />
          // </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    component: (
    // <ProtectedRoute roles={["admin"]}>
        <Admin />
    // </ProtectedRoute>
    )
  },
  {
    path: "/404",
    component: <Page404 />,
  },
  {
    path: "/",
    component: <Navigate to="/inicio" />
  },
  {
    path: "*",
    component: <Navigate to="/404" />
  },
];

export default routes;
