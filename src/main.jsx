import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Product from './components/Product.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import Signup from './components/Signup.jsx';
import Signin from './components/Signin.jsx';
import RegisterProduct from './components/RegisterProduct.jsx';

let routes=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'',
        element:<Product/>
      },
      {
        path:'/productdetails/:id',
        element:<ProductDetails/>
      },
      {
        path:'/signup',
        element:<Signup/>
      },
      {
        path:'/signin',
        element:<Signin/>
      },
      {
        path:'/registerproduct',
        element:<RegisterProduct/>
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}>
    <App />
    </RouterProvider>
  </StrictMode>,
)
