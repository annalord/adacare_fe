import React, { useState, createContext }from 'react';
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

const kInitialUserState = {
  isLoggedIn: false,
  name: null,
  id: null,
}

export const UserContext = createContext();

const Index = () => {
  const [userState, setUserState] = useState(kInitialUserState);

  const routes = [
    {
      path: "/login",
      element: <Login  />
      // appState={appState} setAppState={setAppState}
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/managetodos",
      element: <ManageToDos  />,
    },
    {
      path: "/managemeds",
      element: <ManageMeds  />,
    },
    {
      path: "/calendar",
      element: <Calendar  />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ];
  
  return (
    <React.StrictMode>
      <UserContext.Provider value={[userState, setUserState]}>
        <RouterProvider router={createBrowserRouter(routes)} />
      </UserContext.Provider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);





