import { createSlice } from "@reduxjs/toolkit";

interface State {
    token: string;
    isAuthenticated: boolean;
}

const authReducer = createSlice({
    name: 'users',
    initialState: {
        userData: null,
        isAuthenticated:false
        
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
          },
          signOut: state => {
            state.userData = null;
            state.isAuthenticated = false;
          }
    },
});

export const { setUserData,setAuthenticated,signOut } = authReducer.actions;

export default authReducer.reducer;