

import {createBrowserRouter,createRoutesFromElements,Form,Route,RouterProvider} from "react-router-dom"
import About from './Pages/About';
import Products from './Pages/Products';
import Home from './Pages/Home';
import Root from './component/Root';
import {} from '@reduxjs/toolkit'
import Cart from './Pages/Cart';
import SopingCart from './Pages/SopingCart';
import RthunkCurd from './Pages/RthunkCurd';

import RtkForm from './Pages/RtkForm';
import RtkQcurd from './Pages/RtkQcurd';
import RthunkUser from './Pages/RthunkUser';
import Register from './Pages/Register';
import Hero from "./Pages/Hero";
import Footer from "./Pages/Footer";


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root/>}>
      <Route index element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='products' element={<Products/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='SopingCart' element={<SopingCart/>}/>
      <Route path='RthunkCurd' element={<RthunkCurd/>}/>
      <Route path='RthunkUser' element={<RthunkUser/>}/>
      <Route path='RtkForm' element={<RtkForm/>}/>
      <Route path='RtkQcurd' element={<RtkQcurd/>}/>
      <Route path='Register' element={<Register/>}/>
      <Route path='Hero' element={<Hero/>}/>
      <Route path='Footer' element={<Footer/>}/>

    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
