import { createSlice } from "@reduxjs/toolkit";
import Product from "../Product";
import {toast} from "react-toastify"

const initialState={

    cart:localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):[],
    // cart:[],
    items:Product,
    totalQuantity:0,
    totalPrice:0
};
const cartSlice=createSlice({
    name:"Cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const find=state.cart.findIndex((item)=>item.id===action.payload.id)
            if(find>=0){
                state.cart[find].quantity += 1;
                toast.info(`increase ${state.cart[find].title} quantity`,{position:"bottom-left"});
                // toast('🦄 Wow so easy!', {
                //     position: "bottom-left",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "light",
                //     });
            }else{
                
                state.cart.push(action.payload)

                toast.success(`${action.payload.title} Added to  Cart`,{position:"bottom-left"});
            }
            localStorage.setItem("cart",JSON.stringify(state.cart))
        },
        getCartTotal:(state,action)=>{
            let {totalQuantity,totalPrice}=state.cart.reduce((cartTotal,cartItem)=>{
                // console.log("carttotal",cartTotal);
                // console.log("cartitem",cartItem);
                const { price, quantity } = cartItem;
                // console.log(price, quantity);
                const itemTotal = price * quantity;
                cartTotal.totalPrice += itemTotal;
                cartTotal.totalQuantity += quantity;
                return cartTotal;
            },
            {
                totalPrice: 0,
                totalQuantity: 0,
            }
            )
            state.totalPrice = parseInt(totalPrice.toFixed(2));
            state.totalQuantity = totalQuantity;
        },
        deleteItem:(state,action)=>{
            state.cart=state.cart.filter((item)=>item.id !==action.payload)
            localStorage.setItem("cart",JSON.stringify(state.cart))
            console.log(action.payload.price)
        },
        decIquantity: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, quantity: item.quantity <=1 ?item.quantity:item.quantity -1 };
                }
                return item;
            });

          },
        incQuantity:(state,action)=>{
            state.cart=state.cart.map((item)=>{
                if(item.id === action.payload){
                    return {...item,quantity: item.quantity +1}
                }
                return item
            })
        },
        clearcart:(state,action)=>{
            state.cart=[]
            localStorage.setItem("cart",JSON.stringify(state.cart))
        }
        
    }
})

export const {addToCart,getCartTotal,deleteItem,incQuantity,decIquantity,clearcart}=cartSlice.actions;
export default cartSlice.reducer

// decQuantity