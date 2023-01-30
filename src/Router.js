import { Navigate } from "react-router-dom";

import Login from './pages/login'
import SignUp from './pages/signup'
import Home from './pages/home'
import ManageToDos from './pages/managetodos'
import ManageMeds from './pages/managemeds'
import Calendar from './pages/calendar'


const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: '/home',
    element: <Home/>
  },
  {
    path: '/managetodos',
    element: <ManageToDos/>
  },
  {
    path: '/managemeds',
    element: <ManageMeds/>
  },
  {
    path: '/calendar',
    element: <Calendar/>
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
];

export default routes;
