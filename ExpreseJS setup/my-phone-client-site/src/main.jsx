import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Main from './components/Main'
// import Contact from './components/Contact'
import Phones from './components/Phones'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Phone from './components/Phone'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/phones",
        element: <Phones />,
        loader: ()=>fetch('http://localhost:5000/post')
      },

      {
        path: "/phone/:id",
        element: <Phone />,
        loader: ({params})=>fetch(`http://localhost:5000/post/${params.id}`)
        
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
