import { createSlice } from "@reduxjs/toolkit";

interface State {
    TagsAllRecord:any;
    deleteTag:any  
}
const mainReducer = createSlice({
    name: 'main',
    initialState: {
        TagsAllRecord:[],
        deleteTag:null
    },
    reducers: {
        setTagsAllRecord: (state:any, action:any) => {
            state.TagsAllRecord = action.payload;
        },
        addTag: (state:any, action:any) => {
            state.TagsAllRecord.unshift(action.payload);
        },
        setdeleteTags: (state:any, action:any) => {
            const newTagsAllRecord = state.TagsAllRecord = state.TagsAllRecord.filter(tag => tag.id !== action?.payload);
              state.TagsAllRecord = newTagsAllRecord;
              state.deleteTag = action.payload;
        },

    },
});

export const {setTagsAllRecord,setdeleteTags,addTag} = mainReducer.actions;

export default mainReducer.reducer;