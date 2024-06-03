import { createSlice } from "@reduxjs/toolkit";

interface State {
    token: string;
}

const authReducer = createSlice({
    name: 'users',
    initialState: {
        userData: null
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
    },
});

export const { setUserData } = authReducer.actions;

export default authReducer.reducer;