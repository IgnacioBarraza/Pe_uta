import HomePage from '../pages/HomePage/homepage';
import Projects from '../pages/Projects/projects';
import ProjectsBySubject from '../pages/ProjectsBySubject/projectsbysubject';
import ProjectsEvaluated from '../pages/ProjectsEvaluated/projectsevaluated';
import LogIn from '../pages/accessPage/login';

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
  },
  {
    path: '/projects',
    component: <Projects />,
    exact: true,
  },
  {
    path: '/projects_by_subject/:id',
    component: <ProjectsBySubject />,
    exact: true,
  },
  {
    path: '/evaluated',
    component: <ProjectsEvaluated />,
    exact: true,
  },
];

export default routes;
