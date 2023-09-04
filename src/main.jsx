import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Link
} from "react-router-dom";
import './index.css'
import Week1 from './Week1';
import Week2 from './Week2';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Week1/>,
  },
  {
    path: "/week2",
    element: <Week2/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <header>
        <h1>Bonnie Wang - React practice</h1>
        <nav>
          <ul>
            <li>
              <a href={`/`}>Week1</a>
            </li>
            <li>
            <a href={`/week2`}>Week2</a>
            </li>
          </ul>
        </nav>
      </header>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
