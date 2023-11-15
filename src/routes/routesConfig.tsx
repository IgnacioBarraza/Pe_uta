import HomePage from "../pages/HomePage/homepage";
import Projects from "../pages/Projects/projects";
import ProjectsEvaluated from "../pages/ProjectsEvaluated/projectsevaluated";
import LogIn from "../pages/accessPage/login";

const routes = [
  {
    path: '/',
    component: <LogIn />,
    
  },
  {
    path: '/home',
    component: <HomePage />,
  },
  {
    path: '/projects',
    component: <Projects />,
    routes: [
      {
        path: '/projects/:id',
        component: <Projects />
      }
    ]
  },
  {
    path: '/evaluated',
    component: <ProjectsEvaluated />
  }
]

export default routes;