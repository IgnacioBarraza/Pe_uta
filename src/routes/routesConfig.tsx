import HomePage from "../pages/HomePage/homepage";
import Projects from "../pages/Projects/projects";
import LogIn from "../pages/accessPage/login";

const routes = [
  {
    path: '/',
    component: <LogIn />,
    
  },
  {
    path: '/home',
    component: <HomePage />,
    routes: [
      {
        path: '/home/dashboard',
        component: <Projects />
      }
    ]
  }
]

export default routes;