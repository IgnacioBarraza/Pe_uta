import AccessPage from "../pages/accessPage/accesspage";
import LogIn from "../pages/accessPage/components/login";

const routes = [
  {
    path: '/',
    component: <AccessPage />,
    routes: [
      {
        path: '/login',
        component: <LogIn />
      }
    ]
  }
]

export default routes;