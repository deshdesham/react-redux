import React from 'react'
import Navbar from '../Pages/Navbar';
import { Outlet } from 'react-router-dom';
// import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Breadcrumbs from './Breadcrumbs';
import Hero from '../Pages/Hero';
import Footer from '../Pages/Footer';
import Product from '../Product';
import About from "../Pages/About"

const Root = () => {
  return (
    <React.Fragment>
        <Navbar/>
        {/* <ToastContainer/> */}
        <Breadcrumbs/>
        {/* <Hero/>  */}
        {/* <Product/> */}
        {/* <About/> */}
        <main>

        <Outlet />
        </main>
        <Footer/>
        
    </React.Fragment>
  )
}

export default Root;