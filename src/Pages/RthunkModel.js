import React from 'react'
import { useSelector } from 'react-redux';

const RthunkModel = ({id,setPopup}) => {
  const allUser=useSelector((state)=>state.curd.users)
  const sigleuser=allUser.filter((el)=>el.id===id)
  // console.log(sigleuser);
  return (
    <div className='modelbackground'>
        <div className='modelcontainer'>
            <button onClick={()=>setPopup(false)}>X</button>
            <div style={{display:"flex",flexDirection:"column"}}>
             < p>{sigleuser[0].name}</p>
             < p>{sigleuser[0].email}</p>
             < p>{sigleuser[0].age}</p>
             < p>{sigleuser[0].gender}</p>
            </div>
        </div>
    </div>
  )
}

export default RthunkModel;