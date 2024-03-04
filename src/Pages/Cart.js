import React, { useEffect } from 'react'
import { Heart, Trash } from 'lucide-react'
import CartSlice, { deleteItem, incQuantity ,decIquantity,clearcart} from '../component/CartSlice';
import { useSelector,useDispatch } from 'react-redux';
import {getCartTotal} from "../component/CartSlice"

// const Cart = () => {

//     const { cart,totalQuantity,totalPrice}=useSelector((state)=>state.allCart)
//     const dispatch=useDispatch()
//     useEffect(()=>{

//         dispatch(getCartTotal())
//     },[cart])
//   return (
//     <div >
//         <div>
//             <h1>shopping cart</h1>
//             <p>Total cart- {cart.length}</p>
//         </div>
//                     <tr>
//                         <td>Product</td>
//                         <td>Quntity</td>
//                         <td>Price</td>
//                         <td>Total</td>
//                     </tr>
//         {
            
//             cart.map((item)=>(
//                 <tbody key={item.id}>

//                     <tr>
//                     <td>
//                         <img src={item.img}></img>
//                         <p>{item.title}</p>
//                         {/* <p>₹{item.price}</p> */}
//                         <button onClick={()=>dispatch(deleteItem(item.id))}>Delete</button>
//                     </td>

                    
//                     <td>
//                             <button onClick={()=>dispatch(decIquantity(item.id))}>-</button>
//                             <p>{item.quantity}</p>
//                             <button onClick={()=>dispatch(incQuantity(item.id))}>+</button>
//                     </td>
                    
//                     <td>
//                         <p>{item.price}</p>
//                     </td>
//                     <td>
//                         <p>{item.price*item.quantity}</p>
//                     </td>
                    
//                     </tr>
                    
//                 </tbody>
                
                
//             ))
            
//         }
//         <button onClick={()=>dispatch(clearcart())}>Clear cart</button>
//         <div >
//             <h2>Summary</h2>
//             <div>
//                 <h3>Total Quntity</h3>
//                 <p>{totalQuantity}</p>
//             </div>
//             <div>
//                 <h3>Total Amount</h3>
//                 <p>{totalPrice}</p>
//             </div>
//             <button>GO TO CHECKOUT</button>
//         </div>
        
//     </div>
  
  
//   )
// }

// export default Cart;





const products = [
  {
    id: 1,
    name: 'Nike Air Force 1 07 LV8',
    href: '#',
    price: '₹47,199',
    originalPrice: '₹48,900',
    discount: '5% Off',
    color: 'Orange',
    size: '8 UK',
    imageSrc:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
  },
  {
    id: 2,
    name: 'Nike Blazer Low 77 SE',
    href: '#',
    price: '₹1,549',
    originalPrice: '₹2,499',
    discount: '38% off',
    color: 'White',
    leadTime: '3-4 weeks',
    size: '8 UK',
    imageSrc:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png',
  },
  {
    id: 3,
    name: 'Nike Air Max 90',
    href: '#',
    price: '₹2219 ',
    originalPrice: '₹999',
    discount: '78% off',
    color: 'Black',
    imageSrc:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png',
  },
]

const Cart=()=> {

    const { cart,totalQuantity,totalPrice}=useSelector((state)=>state.allCart)
    const dispatch=useDispatch()
    useEffect(()=>{

        dispatch(getCartTotal())
    },[cart])

  return (
    <div className="mx-auto max-w-7xl px-2 lg:px-0">
        
      <div className="mx-auto max-w-2xl  py-8 lg:max-w-7xl">
        <div className='w-full flex justify-between '>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <h2 className="text-3xl font-bold tracking-tight mr-3 text-gray-900 sm:text-4xl">
          Total Cart : {cart.length}
        </h2>
        </div>
        
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <ul role="list" className="divide-y divide-gray-200">
              {cart.map((product) => (
                <div key={product.id} className="">
                  <li className="flex py-6 sm:py-6 ">
                    <div className="flex-shrink-0">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <a href={product.href} className="font-semibold text-black">
                                {product.name}
                              </a>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-sm text-gray-500">{product.color}</p>
                            {product.size ? (
                              <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                                {product.size}
                              </p>
                            ) : null}
                          </div>
                          <div className="mt-1 flex items-end">
                            <p className="text-xs font-medium text-gray-500 line-through">
                              {product.price}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              &nbsp;&nbsp;{product.price}
                            </p>
                            &nbsp;&nbsp;
                            <p className="text-sm font-medium text-green-500">{product.discount}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <div className="mb-2 flex">
                    <div className="min-w-24 flex">
                      <button type="button" className="h-7 w-7" onClick={()=>dispatch(decIquantity(product.id))}>
                        -
                      </button>
                      <input
                        type="text"
                        className="mx-1 h-7 w-9 rounded-md border text-center" value={product.quantity} ></input>
                      <button type="button" className="flex h-7 w-7 items-center justify-center" onClick={()=>dispatch(incQuantity(product.id))}>
                        +
                      </button>
                    </div>
                    <div className="ml-6 flex text-sm">
                      <button type="button" className="flex items-center space-x-1 px-2 py-1 pl-0" onClick={()=>dispatch(deleteItem(product.id))}>
                        <Trash size={12} className="text-red-500" />
                        <span className="text-xs font-medium text-red-500">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </section>
          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
          >
            <h2
              id="summary-heading"
              className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
            >
              Price Details
            </h2>
            <div>
              <dl className=" space-y-1 px-2 py-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-800">Price (`${cart.length} item`)</dt>
                  <dd className="text-sm font-medium text-gray-900">₹ {totalPrice}</dd>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <dt className="flex items-center text-sm text-gray-800">
                    <span>Discount</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">- ₹ 3,431</dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="flex text-sm text-gray-800">
                    <span>Delivery Charges</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">Free</dd>
                </div>
                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                  <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                  <dd className="text-base font-medium text-gray-900">₹ {totalPrice}</dd>
                </div>
              </dl>
              <div className="px-2 pb-4 font-medium text-green-700">
                You will save ₹ 3,431 on this order
              </div>
              <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Back to shop
        </button>
        <button
          type="button"
          className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Checkout
        </button>
      </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}

export default Cart;