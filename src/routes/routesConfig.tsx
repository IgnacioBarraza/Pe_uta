import HomePage from '../pages/HomePage/homepage';
import Projects from '../pages/Projects/projects';
import ProjectsBySubject from '../pages/ProjectsBySubject/projectsbysubject';
import ProjectsEvaluated from '../pages/ProjectsEvaluated/projectsevaluated';
import EvaluateProject from '../pages/EvaluateProject/evaluateprojects';
import LogIn from '../pages/accessPage/login';
import ProtectedRoute from './protectedRoute';

const routes = [
  {
    path: '/',
    component: <LogIn />,
    exact: true,
  },
  {
    path: '/home',
    component: <HomePage />,
    exact: true,
    protection: <ProtectedRoute
    roles={["user", "admin"]} />
  },
  {
    path: '/projects',
    component: <Projects />,
    exact: true,
    protection: <ProtectedRoute
    roles={["user", "admin"]} />
  },
  {
    path: '/projects_by_subject/:id',
    component: <ProjectsBySubject />,
    exact: true,
    protection: <ProtectedRoute
    roles={["user", "admin"]} />
  },
  {
    path: '/project_id/:id',
    component: <EvaluateProject />,
    exact: true,
    protection: <ProtectedRoute
    roles={["user", "admin"]} />
  },
  {
    path: '/evaluated',
    component: <ProjectsEvaluated />,
    exact: true,
    protection: <ProtectedRoute
    roles={["user", "admin"]} />
  },
];

export default routes;
