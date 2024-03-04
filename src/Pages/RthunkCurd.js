import React from 'react'
 import {useForm} from "react-hook-form"
 import {useDispatch} from 'react-redux';
import { createUser } from '../component/CurdSlice';
const Curd = () => {
    const dispatch=useDispatch()
    const { register, handleSubmit } = useForm();
    const onSubmit = (createuser)=>{
        console.log(createuser);
        dispatch(createUser(createuser))
    }
        
  return (
    <div className='mbox'>
        <h1>Curd App</h1>
    <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex',border:"1px solid gray",flexDirection:"column",width:"30rem",alignItems:"center"}}>
        <label>name:</label>
      <input type='text'{...register("name")} />
      <label>email:</label>
      <input type='text'{...register("email")} />
      <label>age:</label>
      <input type='number'{...register("age")} />
      <label>gender:</label>
      <select type="select" {...register("gender")}>
        <option value="" disabled>--select gender--</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      <button type="submit">create</button> 
      {/* <input type="submit" /> */}
    </form>
        
    </div>
    
  )
}

export default Curd;