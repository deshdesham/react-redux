import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ShowUser ,DeleteUser, UpdateUser} from '../component/CurdSlice';
import RthunkModel from './RthunkModel';
import { useForm } from 'react-hook-form';

const RthunkUser = () => {
  const {register,handleSubmit,setValue}=useForm({
    progressive: true 
  })
  const [id,setId]=useState([])
  const [popup,setPopup]=useState(false)
    const dispatch=useDispatch()
    const {users,loading}=useSelector((state)=>state.curd)
    useEffect(()=>{
      dispatch(ShowUser())
      // dispatch(DeleteUser())
    },[users])
    function onSubmit(updateuser){
      console.log(updateuser);
      console.log(updateuser);
      dispatch(UpdateUser(updateuser))
    }
    function UpdateId(id){
      // const {users,loading}=useSelector((state)=>state.curd)
      const sigleuser=users.filter((el)=>el.id===id) 
      console.log(sigleuser);
      // console.log(sigleuser[sigleuser.length-1].name);
      // console.log(sigleuser[sigleuser.length-1].age);
      setValue("name",sigleuser[sigleuser.length-1].name)
      setValue("email",sigleuser[sigleuser.length-1].email)
      setValue("age",sigleuser[sigleuser.length-1].age) 
        setValue("gender",sigleuser[sigleuser.length-1].gender)  
        setValue("id",sigleuser[sigleuser.length-1].id)  
      // console.log(id);
    }
    if(loading){
      return <h1>Loading....</h1>
    }
  return (
   <div className=' mbox'>
    {
      popup &&  <RthunkModel id={id} setPopup={setPopup}/>
    }

     <div>All Users</div>
    {
      users && users.map((item)=>{
        return (
          <div className=' flex ' key={item.id}>
            <h2>{item.name}</h2>
            <h3>{item.email}</h3>
            <h3>{item.age}</h3>
            <h3>{item.gender}</h3>
            <button onClick={() =>[setId(item.id),setPopup(true)]}>View</button>
            <button onClick={()=>UpdateId(item.id)} >Update</button>
            <button onClick={()=>dispatch(DeleteUser(item.id))}>Delete</button>
          </div>
        );
      })
    }

    <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex',border:"1px solid gray",flexDirection:"column",width:"30rem",alignItems:"center"}}>
        <label>name:</label>
      <input type='text'{...register("name")} />
      <label>email:</label>
      <input type='text'{...register("email")} />
      <label>age:</label>
      <input type='text'{...register("age")} />
      <label>gender:</label>
      <select type="select" {...register("gender")}>
        <option value="" disabled>--select gender--</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      <button type="submit">update</button>
      {/* <input type="submit"/> */}
    </form>
   </div>
  )
}

export default RthunkUser;