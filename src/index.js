import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import FourOhFour from './misc_components/FourOhFour.js';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Home from './pages/home/Home';
import ManageToDos from './pages/manage_todos/ManageToDos';
import ManageMeds from './pages/manage_meds/ManageMeds';
import Calendar from './pages/calendar/Calendar';
import './index.css';
import { AuthProvider } from './hooks/useAuthContext.js';

const Index = () => {
  const AuthorizedLayout = () => (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );

  const routes = [
    {
      element: <AuthorizedLayout />,
      children: [
        {
          path: '/',
          element: <Login />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/home',
          element: <Home />,
        },
        {
          path: '/managetodos',
          element: <ManageToDos />,
        },
        {
          path: '/managemeds',
          element: <ManageMeds />,
        },
        {
          path: '/calendar',
          element: <Calendar />,
        },
        {
          path: '/404',
          element: <FourOhFour />,
        },
        {
          path: '*',
          element: <Navigate to='/404' replace />,
        },
      ],
    },
    // unprotected route
    {
      path: '/signup',
      element: <SignUp />,
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
