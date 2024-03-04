import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const usersApi=createApi({
  reducerPath:"UsersApi",
  baseQuery:fetchBaseQuery({
    baseUrl:"http://localhost:5000/"
  }),
  tagTypes:["Users"],
  endpoints:(builder)=>({
    getAllUsers:builder.query({
      query:()=>({
        url:"Users",
        method:"GET"
      }),
      // provideTags:(result,error,arg)=>result ? [...result.map(({id})=>({type:"Users",id})),"Users"]:["Users"],
      providesTags:["Users"]
    }),
    // getUserById:builder.query({
    //   query:(id)=>({
    //     url:`users/${id}`,
    //     method:"GET"
    //   })
    // }),
    // ------------also---------write----this
    getUserById:builder.query({
      query:(id)=>{
        console.log(id);
        return {
          url:`Users/${id}`,
          method:"GET"
      }
        },
        invalidatesTags:["Users"]
    }),
    getUserByLimit:builder.query({
      query:(num)=>({
          url:`Users?_limit=${num}`,
          method:"GET"
      }),
        invalidatesTags:["Users"]
    }),
    DeleteById:builder.mutation({
      query:(id)=>{
        return {

          url:`Users/${id}`,
          method:"DELETE"
        }
    },
    invalidatesTags:["Users"]

    }),
    CreateUser:builder.mutation({
      query:(data)=>({
        url:"Users",
        method:"POST",
        body:data,
        headers:{
          'Content-Type':"application/json"
        }
      }),
      invalidatesTags:["Users"]
    }),
    UpdateUser:builder.mutation({
      query:(updata)=>{
        const {id,...data}=updata
        return {

          url:`Users/${id}`,
          method:"PUT",
          body:data,
          headers:{
            'Content-Type':"application/json"
          }
        }
        },
      invalidatesTags:["Users"]
    }),
    PatchUser:builder.mutation({
      query:(updata)=>{
        const {id,...data}=updata
        return {

          url:`Users/${id}`,
          method:"PATCH",
          body:data,
          headers:{
            'Content-Type':"application/json"
          }
        }
        },
      invalidatesTags:["Users"]
    }),
    getItems: builder.query({
      query: (page = 1) => `items?page=${page}`,
    }),

  })
})

export const {useGetAllUsersQuery,useGetUserByIdQuery,useGetUserByLimitQuery,useDeleteByIdMutation,useCreateUserMutation,useUpdateUserMutation,usePatchUserMutation,useGetItemsQuery}=usersApi