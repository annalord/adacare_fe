import { Navigate } from "react-router-dom";

import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'
import ManageToDos from './pages/manage_todos/ManageToDos'
import ManageMeds from './pages/manage_meds/ManageMeds'
import Calendar from './pages/calendar/Calendar'

export const routes = [
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