import React from 'react'
import { ArrowUpRight, X  } from 'lucide-react'
import { useGetAllUsersQuery } from '../component/UserApi';



const RtkModel=({id,setPopup}) =>{

    const {data}=useGetAllUsersQuery()
    console.log(data);

  const sigleuser=data.filter((el)=>el.id===id)
  console.log(sigleuser)

  return (
      <div className="fixed inset-0 flex justify-center items-center bg-slate-300 bg-opacity-30 backdrop-blur-sm z-50 ">
        

    <div className="w-[300px] rounded-md border absolute ">
        <div className=' relative right-[-280px] top-6'>
        <button
      type="button"
      className="rounded-full bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      onClick={()=>setPopup(false)}
    >
      < X  className="h-4 w-4" />
    </button>
        </div>
      <img
        src={sigleuser[0].image}
        alt="Laptop"
        className="h-[200px] w-full rounded-t-md object-cover"
      />
      <div className="p-4 bg-slate-200">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {sigleuser[0].username} &nbsp; <ArrowUpRight className="h-4 w-4" />
        </h1>
        <p className="mt-3 text-sm text-gray-600">
           Email : {sigleuser[0].email}
        </p>
        <p className="mt-3 text-sm text-gray-600">
        Password : {sigleuser[0].password}
        </p>
        <p className="mt-3 text-sm text-gray-600">
        City : {sigleuser[0].address.city}
        </p>
        <p className="mt-3 text-sm text-gray-600">
          University : {sigleuser[0].university}
        </p>
        <div className="mt-4">
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
            # {sigleuser[0].firstName}
          </span>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
            # {sigleuser[0].bloodGroup}
          </span>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
            # {sigleuser[0].phone}
          </span>
        </div>
        <button
          type="button"
          className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          View Detils
        </button>
      </div>
    </div>
    </div>
  )
}

export default RtkModel