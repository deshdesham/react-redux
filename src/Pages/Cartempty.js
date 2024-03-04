import React from 'react'
import { useNavigate } from 'react-router-dom';

const Cartempty = () => {
    const navigate=useNavigate()
  return (
    <div>
        <h1>Missing Cart items?</h1>
        <p>Login to see the items you added previously</p>
        <button>Login</button>
        <button onClick={()=>navigate("/Products")}>Continue shopping</button>
    </div>

  )
}

export default Cartempty;