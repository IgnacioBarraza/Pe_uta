import HomePage from "../pages/HomePage/homepage";
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
      
    ]
  }
]

export default routes;