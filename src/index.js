import React, { useState }from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';
import { routes } from './Router'

const router = createBrowserRouter(routes);

const Index = () => {
  const [appState, setAppState] = useState({});

  return (
    <RouterProvider router={router}>
      <React.StrictMode>
        {routes.map(({ path, element }) => {
          //clone an element and pass new props to it 
          return React.cloneElement(element, {
            key: path,
            appState,
            setAppState
          });
        })}
      </React.StrictMode>
    </RouterProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);





