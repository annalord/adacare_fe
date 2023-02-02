import React, { useState }from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Navigate } from "react-router-dom";

import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'
import ManageToDos from './pages/manage_todos/ManageToDos'
import ManageMeds from './pages/manage_meds/ManageMeds'
import Calendar from './pages/calendar/Calendar'
import './index.css';

const kInitialAppState = {
  isAuthenticated: false,
  name: ""
}

const Index = () => {
  const [appState, setAppState] = useState(kInitialAppState);

  const routes = [
    {
      path: "/login",
      element: <Login appState={appState} setAppState={setAppState} />,
    },
    {
      path: "/signup",
      element: <SignUp appState={appState} setAppState={setAppState} />,
    },
    {
      path: "/home",
      element: <Home appState={appState} setAppState={setAppState} />,
    },
    {
      path: "/managetodos",
      element: <ManageToDos appState={appState} setAppState={setAppState} />,
    },
    {
      path: "/managemeds",
      element: <ManageMeds appState={appState} setAppState={setAppState} />,
    },
    {
      path: "/calendar",
      element: <Calendar appState={appState} setAppState={setAppState} />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ];
  
  return (
    <React.StrictMode>
      <RouterProvider router={createBrowserRouter(routes)} />
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);





