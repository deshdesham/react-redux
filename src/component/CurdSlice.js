import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

//create user
export const createUser = createAsyncThunk(
    "createUser",
    async (createuser, { rejectWithValue }) => {
      
      const response = await fetch(
        "https://64660cf7228bd07b355a271f.mockapi.io/Crud",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createuser),
        }
      );
  
      try {
        const result = await response.json();
        return result;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

   ///read user
   export const ShowUser=createAsyncThunk("ShowUser",async (args,{rejectWithValue})=>{
    const res=await fetch("https://64660cf7228bd07b355a271f.mockapi.io/Crud")
    try{
        const result=await res.json()
        return result;
    }catch(error){
        return rejectWithValue(error)
    }
   })
    //delete user
   export const DeleteUser=createAsyncThunk("DeleteUser",async (id,{rejectWithValue})=>{
    const res=await fetch(
      `https://64660cf7228bd07b355a271f.mockapi.io/Crud/${id}`,
      {method:"DELETE"})
    try{
        const result=await res.json()
        return result;
    }catch(error){
        return rejectWithValue(error)
    }
   })
    //update user
   export const UpdateUser=createAsyncThunk("UpdateUser",async(updateuser,{rejectWithValue})=>{
    // console.log(updateuser.id);
    const {id}=updateuser
    console.log(id);
    const res=await fetch(`https://64660cf7228bd07b355a271f.mockapi.io/Crud/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(updateuser)
    })
    try{
      const resulet=await res.json()
      console.log(resulet);
      return resulet

    }catch(error){
      rejectWithValue(error)
    }
   })

export const CurdSlice=createSlice({
    name:"curd",
    initialState: {
        users: [],
        loading: false,
        error: null,
        searchData: [],
      },
    
    extraReducers:{
        [createUser.pending]:(state)=>{
            state.loading=true
        },
        [createUser.fulfilled]:(state,action)=>{
            state.loading=false
            state.users.push(action.payload)
        },
        [createUser.rejected]:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },
        [ShowUser.pending]:(state)=>{
            state.loading=true
        },
        [ShowUser.fulfilled]:(state,action)=>{
          state.loading=false
            state.users=action.payload
        },
        [ShowUser.rejected]:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },
        [DeleteUser.pending]:(state)=>{
          state.loading=true
        },
        [DeleteUser.fulfilled]:(state,action)=>{
          state.loading=false
          const id =action.payload.id;
          state.users=state.users.filter((el)=>el.id !== id)
        },
        [DeleteUser.rejected]:(state,action)=>{
          state.loading=false
          state.error=action.payload
        },
        [UpdateUser.pending]:(state)=>{
          state.loading=true
        },
        [UpdateUser.fulfilled]:(state,action)=>{
        //   console.log(action);
          console.log(action.payload);
          state.loading=false
          state.users=state.users.map((el)=>(
            el.id===action.payload.id ? action.payload:el
            ))
        },
        [UpdateUser.pending]:(state,action)=>{
          state.loading=false
          state.error=action.payload
        }
    }
})

export default CurdSlice.reducer