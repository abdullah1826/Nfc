import { createSlice } from "@reduxjs/toolkit";

interface State {
    token: string;
    isAuthenticated: boolean;
}

const authReducer = createSlice({
    name: 'users',
    initialState: {
        userData: null,
        userotpEmail:"",
        isAuthenticated:false
        
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
          },
          setuserotpEmail: (state, action) => {
            state.userotpEmail = action.payload;
        },
          signOut: state => {
            state.userData = null;
            state.isAuthenticated = false;
          }
    },
});

export const { setUserData,setAuthenticated,signOut,setuserotpEmail} = authReducer.actions;

export default authReducer.reducer;