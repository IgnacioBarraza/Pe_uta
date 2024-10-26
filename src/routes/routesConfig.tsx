import { Layout } from "@/shared/layout";
import { Projects } from "@/shared/project/projects";
import Evaluate from "@/shared/evaluate/evaluate";
import Auth from "@/auth/login";
import { Home } from "@/shared/Home/home";
import { Page404 } from "@/shared/page404";
import Admin from "@/shared/admin/admin";
import { Navigate } from "react-router-dom";
import Evaluated from "@/shared/evaluated/evaluated";

const routes = [
  {
    path: "/auth",
    component: <Auth />,
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
        protection: { roles: ["user", "admin"] },
        component: <Evaluate />,
      },
      {
        path: "evaluados",
        protection: { roles: ["user", "admin"] },
        component: <Evaluated />,
      },
    ],
  },
  {
    path: "/admin",
    protection: { roles: ["admin"] },
    component: <Admin />,
  },
  {
    path: "/404",
    component: <Page404 />,
  },
  {
    path: "/",
    component: <Navigate to="/inicio" />,
  },
  {
    path: "*",
    component: <Navigate to="/404" />,
  },
];

export default routes;
