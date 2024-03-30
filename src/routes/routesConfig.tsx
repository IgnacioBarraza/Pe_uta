import HomePage from '../shared/homepage';
import Projects from '../shared/projects';
import ProjectsBySubject from '../shared/projectsbysubject';
import ProjectsEvaluated from '../shared/projectsevaluated';
import EvaluateProject from '../shared/evaluateprojects';
import LogIn from '../auth/login';
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
