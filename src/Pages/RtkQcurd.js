import React, { useState } from 'react'
import { useGetAllUsersQuery ,useDeleteByIdMutation,useGetItemsQuery} from '../component/UserApi';
// import { useNavigate } from 'react-router-dom';
// import {useForm} from "react-hook-form"
import RtkModel from './RtkModel';
import Paginate from './Paginate';
import RtkForm from './RtkForm';
import RtkUpdate from "./RtkUpdate";

import { Eye, EyeIcon, LucideEye, Pencil, Trash } from 'lucide-react';
import { logDOM } from '@testing-library/react';

const RtkQcurd = () => {
    const [id,setId]=useState([])
    const [popup,setPopup]=useState(false)
    const [createpopup,setCreatePopup]=useState(false)
    const [updatePopUp,setUpdatePopUp]=useState(false)
    const [usersPerPage,setUsersPerPage]=useState(8)
    // const navigate=useNavigate()
    const [searchQuery,setSerchQuery]=useState("")
    const [selectedUser, setSelectedUser] = useState(null);
    // -------------------pagination-------------------
    const [currentPage, setCurrentPage] = useState(0);
    // const usersPerPage = 3; // Number of users to display per page
    const offset = currentPage * usersPerPage;
    //   -----------------------pagination end---------------
    // const {data:users,isLoading,isError}=useGetAllUsersQuery()
    // const { data: users, isLoading, isError } = useGetUserByLimitQuery({ limit });
    const { data: allUsers, isLoading: allUsersLoading, isError: allUsersError } = useGetAllUsersQuery();

    // Rename the variables for the second query
    // const { data: limitedUsers, isLoading: limitedUsersLoading, isError: limitedUsersError } = useGetUserByLimitQuery({ limit });

    // console.log( AllUsers.data);
    const [deleteUser]=useDeleteByIdMutation()
    // const [update]=useUpdateUserMutation()
    // const {register,handleSubmit,setValue}=useForm()
    // const singleresinfo=useGetUserByIdQuery(5)
    function delUser(id){
        deleteUser(id)
            // console.log(id);
        }

        function Handlechange(e){
            const newLimit = parseInt(e.target.value, 10);
            setUsersPerPage(newLimit)
            setCurrentPage(0)
        }
        // --------------------------filter method------------
        // function UpdateId(id){
        //       const sigleuser=users.filter((el)=>el.id===id) 
        //       console.log(sigleuser);
        //       console.log(sigleuser[0].firstName);
        //       setValue("username",sigleuser[0].username)
        //       setValue("email",sigleuser[0].email)
        //       setValue("password",sigleuser[0].password)   
        //       setValue("id",sigleuser[0].id)   
        //     }
            // --------------------filter end------------------
        function UpdateId(id){
            const userToUpdate = allUsers.find((user) => user.id === id);
            if (userToUpdate) {
              setSelectedUser(userToUpdate);
            }
        
            }
    // function onSubmit(updata){
    //     console.log(updata);
    //     // let modify=update;
    //     update(update);
    // }
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };
    const filter=allUsers?.filter((user)=>{
        const { username, email, password } = user;
        const keys = [username, email, password];
        return keys.some((key) => key.toLowerCase().includes(searchQuery.toLowerCase()));
    })
    const displayedUsers = filter?.slice(offset, offset + usersPerPage);
    const pageCount = Math.ceil(filter?.length / usersPerPage);
    console.log(pageCount);

  return (
// -----------------------titile like serch,create button------
    <div className='mbox'>

        <div className='title'>
        {popup && <RtkModel id={id} setPopup={setPopup}/>}
        {createpopup && <RtkForm setCreatePopup={setCreatePopup}/>}
        {updatePopUp && selectedUser &&
         <RtkUpdate user={selectedUser}  setUpdatePopUp={setUpdatePopUp} />
        }    
        </div >


        <div className=' flex justify-center mt-3 mb-3'>
        <input type='number'  placeholder='Limit Search..' onChange={Handlechange} className=' ml-4 border-green-300 rounded-md border'/>
        { displayedUsers && 
        <input type='text' className=' border-green-300 ml-4 rounded-md border' placeholder=' Search..' onChange={(e)=>{setSerchQuery(e.target.value) 
            setCurrentPage(0)}}></input>
        } 
            <button onClick={()=>setCreatePopup(true)} className=' px-4 py-2 bg-green-200 text-green-500 font-bold rounded-md ml-auto mr-4 ' >Create User</button>
            </div>
        
        {/* -------------------end titile------------------ */}
        <table className='w-full divide-y divide-gray-200'>
            <thead className="bg-gray-50">
                
                    <tr>
                        <th  scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">id</th>
                        <th  scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">image</th>
                        <th  scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">UserName</th>
                        <th  scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">Email</th>
                        <th  scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">Password</th>
                        <th  scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">Action</th>
                        
                    </tr>
                    </thead>
        {
            allUsersLoading ? (<h1>Loding....</h1>):allUsersError ? (<p>Error fetching users. Please try again later.</p>):
           displayedUsers && displayedUsers.length >0 ? displayedUsers.map((item,i)=>(
            <tbody className="divide-y divide-gray-200 bg-white">
                <tr key={i} className="border-t border-gray-200">
                    <td>{item.id}</td>
                    <td><img src={item.image} alt='imga' className='w-[80px]'></img></td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td><button onClick={()=>[setId(item.id),setPopup(true)]} className='rtkqbut'>View</button></td>
                    <td><button onClick={()=>[UpdateId(item.id),setUpdatePopUp(true)]} className='rtkqbut'>Patch</button></td>
                    <td><button onClick={(e)=>delUser(item.id)} className='rtkqbut'>Delete</button></td>
                </tr>
                </tbody>
            )
           ):
           <td>no data :(</td>
        }
        
        </table>
        
        {
            pageCount > 0 && (
                <Paginate handlePageChange={handlePageChange} pageCount={pageCount}  />
        )
        }
        

        </div>

  )
}



export default RtkQcurd;

// ------------------------------------------------





// const RtkQcurd=()=> {

//     const [id,setId]=useState([])
//     const [popup,setPopup]=useState(false)
//     const [createpopup,setCreatePopup]=useState(false)
//     const [updatePopUp,setUpdatePopUp]=useState(false)
//     const [usersPerPage,setUsersPerPage]=useState(8)
//     // const navigate=useNavigate()
//     const [searchQuery,setSerchQuery]=useState("")
//     const [selectedUser, setSelectedUser] = useState(null);
//     // -------------------pagination-------------------
//     const [currentPage, setCurrentPage] = useState(0);
//     // const usersPerPage = 3; // Number of users to display per page
//     const offset = currentPage * usersPerPage;
//     //   -----------------------pagination end---------------
//     // const {data:users,isLoading,isError}=useGetAllUsersQuery()
//     // const { data: users, isLoading, isError } = useGetUserByLimitQuery({ limit });
//     const { data: allUsers, isLoading: allUsersLoading, isError: allUsersError } = useGetAllUsersQuery(currentPage + 1);

//     // Rename the variables for the second query
//     // const { data: limitedUsers, isLoading: limitedUsersLoading, isError: limitedUsersError } = useGetUserByLimitQuery({ limit });

//     // console.log( AllUsers.data);
//     const [deleteUser]=useDeleteByIdMutation()
//     // const [update]=useUpdateUserMutation()
//     // const {register,handleSubmit,setValue}=useForm()
//     // const singleresinfo=useGetUserByIdQuery(5)
//     function delUser(id){
//         deleteUser(id)
//             // console.log(id);
//         }

//         function Handlechange(e){
//             const newLimit = parseInt(e.target.value, 10);
//             setUsersPerPage(newLimit)
//             setCurrentPage(0)
//         }
//         // --------------------------filter method------------
//         // function UpdateId(id){
//         //       const sigleuser=users.filter((el)=>el.id===id) 
//         //       console.log(sigleuser);
//         //       console.log(sigleuser[0].firstName);
//         //       setValue("username",sigleuser[0].username)
//         //       setValue("email",sigleuser[0].email)
//         //       setValue("password",sigleuser[0].password)   
//         //       setValue("id",sigleuser[0].id)   
//         //     }
//             // --------------------filter end------------------
//         function UpdateId(id){
//             const userToUpdate = allUsers.find((user) => user.id === id);
//             console.log(userToUpdate);
//             if (userToUpdate) {
//               setSelectedUser(userToUpdate);
//             }
        
//             }
//     // function onSubmit(updata){
//     //     console.log(updata);
//     //     // let modify=update;
//     //     update(update);
//     // }
//     const handlePageChange = ({ selected }) => {
//         setCurrentPage(selected);
//     };
//     const filter=allUsers?.filter((user)=>{
//         const { username, email, password } = user;
//         const keys = [username, email, password];
//         return keys.some((key) => key.toLowerCase().includes(searchQuery.toLowerCase()));
//     })
//     // const displayedUsers = filter?.slice(offset, offset + usersPerPage);
//     // const pageCount = Math.ceil(filter?.length / usersPerPage);

//     const displayedUsers = allUsers?.pages[currentPage]?.items;
// const pageCount = allUsers?.pages.length;




//   return (
//     <>
//     {/* ------------------------------ */}

//     {popup && <RtkModel id={id} setPopup={setPopup}/>}
    
//         {createpopup && <RtkForm setCreatePopup={setCreatePopup}/>}
//         {updatePopUp && selectedUser &&
//          <RtkUpdate user={selectedUser}  setUpdatePopUp={setUpdatePopUp} />
//         }   

//     {/* --------------------------------------- */}
//     { displayedUsers &&
//      <div className="  w-full md:w-1/3">
//       <input
//         className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//         type="text"
//         placeholder="Search......"
        
//         onChange={(e)=>{setSerchQuery(e.target.value) 
//             setCurrentPage(0)}}
//       ></input>
//     </div>
// }
//       <section className="mx-auto w-full max-w-7xl px-4 py-4">

//         <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
//           <div>
//             <h2 className="text-lg font-semibold">Employees</h2>
//             <p className="mt-1 text-sm text-gray-700">
//               This is a list of all employees. You can add new employees, edit or delete existing
//               ones.
//             </p>
//           </div>
//           <div>
//             <button
//               type="button"
//               className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" 
//               onClick={()=>setCreatePopup(true)}
//             >
//               Add new employee
//             </button>
//           </div>
//         </div>
//         <div className="mt-6 flex flex-col">
//           <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//             <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
//               <div className="overflow-hidden border border-gray-200 md:rounded-lg">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
//                       >
//                         <span>Employee</span>
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
//                       >
//                         Title
//                       </th>

//                       <th
//                         scope="col"
//                         className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
//                       >
//                         Name
//                       </th>

//                       <th
//                         scope="col"
//                         className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
//                       >
//                         Department
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
//                       >
//                         Action
//                       </th>
//                       <th scope="col" className="relative px-4 py-3.5">
//                         <span className="sr-only">Edit</span>
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200 bg-white">
//                     { allUsersLoading ? (<h1>Loding....</h1>):allUsersError ? (<p>Error fetching users. Please try again later.</p>):
//            displayedUsers && displayedUsers.length >0 ? displayedUsers.map((person) => (
//                       <tr key={person.username}>
//                         <td className="whitespace-nowrap px-4 py-4">
//                           <div className="flex items-center">
//                             <div className="h-10 w-10 flex-shrink-0">
//                               <img
//                                 className="h-10 w-10 rounded-full object-cover"
//                                 src={person.image}
//                                 alt=""
//                               />
//                             </div>
//                             <div className="ml-4">
//                               <div className="text-sm font-medium text-gray-900">{person.username}</div>
//                               <div className="text-sm text-gray-700">{person.email}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="whitespace-nowrap px-12 py-4">
//                           {/* <div className="text-sm text-gray-900 ">{person.company.name}</div> */}
//                           <div className="text-sm text-gray-700">{person.company.title}</div>
//                         </td>
//                         <td className="whitespace-nowrap px-4 py-4">
//                           <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
//                             {person.company.name}
//                           </span>
//                         </td>
//                         <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
//                           {person.company.department}
//                         </td>
//                         <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium flex space-x-2 ">
                          
//                           <a className="text-green-400" onClick={()=>[setId(person.id),setPopup(true)]}>
//                             <LucideEye/>
//                           </a>
//                           <a className="text-blue-400" onClick={()=>[UpdateId(person.id),setUpdatePopUp(true)]}>
//                             <Pencil/>
//                           </a>
//                           <a className=" text-red-400 " onClick={(e)=>delUser(person.id)}>
//                             <Trash/>
//                           </a>
//                         </td>
//                       </tr>
//                     )) : <td>no data :(</td>
//                 }
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center justify-center pt-6">
          

//           {
//             pageCount > 0 && (
//                 <Paginate handlePageChange={handlePageChange} pageCount={pageCount}/>)
//           }
          
          
//           {/* <a href="#" className="mx-1 cursor-not-allowed text-sm font-semibold text-gray-900">
//             <span className="hidden lg:block">&larr; Previous</span>
//             <span className="block lg:hidden">&larr;</span>
//           </a>
//           <a
//             href="#"
//             className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
//           >
//             1
//           </a>
//           <a
//             href="#"
//             className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
//           >
//             2
//           </a>
//           <a
//             href="#"
//             className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
//           >
//             3
//           </a>
//           <a
//             href="#"
//             className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
//           >
//             4
//           </a>
//           <a href="#" className="mx-2 text-sm font-semibold text-gray-900">
//             <span className="hidden lg:block">Next &rarr;</span>
//             <span className="block lg:hidden">&rarr;</span>
//           </a> */}
//         </div>
//       </section>
//     </>
//   )
// }

// export default RtkQcurd;