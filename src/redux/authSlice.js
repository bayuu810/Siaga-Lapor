import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
     name: "auth",
     initialState: {
        loading: false,
        user: null,
        useById: null,
        allUsers:[],
     }, reducers: {
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setUser:(state,action) => {
            state.user = action.payload
        },
        setUserById:(state,action) => {
            state.useById = action.payload
        },
        setAllUser:(state,action) => {
            state.allUsers = action.payload
        }
     }
})
export const {setLoading, setUser, setAllUser, setUserById} = authSlice.actions;
export default authSlice.reducer

