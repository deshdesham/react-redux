import React from 'react'
 import {useForm} from "react-hook-form"
//  import {useDispatch} from 'react-redux';
// import { createUser } from '../component/CurdSlice';
import { useCreateUserMutation } from '../component/UserApi';
// import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, X  } from 'lucide-react'


const RtkForm = ({setCreatePopup}) => {
    // const navigate=useNavigate()
    const [create]=useCreateUserMutation()
    const { register, handleSubmit } = useForm();
    const onSubmit = (createuser)=>{
        create(createuser);
        setCreatePopup(false)
    }
        
  return (
    <div className=' fixed inset-0 flex justify-center items-center bg-slate-300 backdrop-blur-sm z-50 bg-opacity-30 '>
      <div className=' border shadow-md h-[400px] w-[300px] relative flex justify-center items-center'>
    <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col'>
    {/* <button onClick={()=>setCreatePopup(false)} className='rtkmodel'>X</button> */}
    <button 
      type="button"
      className="rounded-full absolute right-0 top-0 bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      onClick={()=>setCreatePopup(false)}
    >
      < X  className="h-4 w-4" />
    </button>
      <label>name:</label>
      <input type='text'{...register("username")} className=' mx-4 my-2 border-b-black border ' />
      <label>email:</label>
      <input type='text'{...register("email")} className=' mx-4 my-2 border-b-black border'/>
      <label>Password</label>
      <input type='text'{...register("password")} className=' mx-4 my-2 border-b-black border'/>
      <button
                    type="button"
                    className=" rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mt-3"
                  >
                    Create
                  </button>
      {/* <input type="submit" /> */}
    </form>
    </div>
    </div>
    
  )
}

export default RtkForm;