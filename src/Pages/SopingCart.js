import React from 'react'
// import CartSlice from '../component/CartSlice';
// import {allCart} from "../component/CartSlice"
import { useSelector} from 'react-redux';
// import {getCartTotal} from "../component/CartSlice"
import Cartempty from './Cartempty';
import Cart from './Cart';
const SopingCart = () => {
    const { cart}=useSelector((state)=>state.allCart)
  return (
   <div>
    {
        cart.length ===0 ? <Cartempty/>: <Cart/>
    }
   </div>
   
  )
}

export default SopingCart;