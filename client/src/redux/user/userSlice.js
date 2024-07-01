import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error:null,
    loading:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        sigInStart:(state) => {
            state.loading = true;
        },
        signInSuccess:(state,action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null
        },
        signInFaiilure:(state, action) => {
            state.error = action.payload,
            state.loading = false
        }
    }
})

export const {sigInStart, signInFaiilure, signInSuccess} = userSlice.actions

export default userSlice.reducer