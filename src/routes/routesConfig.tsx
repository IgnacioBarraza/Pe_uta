import HomePage from "../pages/HomePage/homepage";
import LogIn from "../pages/accessPage/login";
import SignUp from "../pages/accessPage/signup";

const routes = [
  {
    path: '/',
    component: <LogIn />,
    routes: [
      {
        path: '/register',
        component: <SignUp />
      }
    ]
  },
  {
    path: '/home',
    component: <HomePage />,
    routes: [
      
    ]
  }
]

export default routes;