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
        updateTagAction: (state:any, action:any) => {
            const index = state.TagsAllRecord.findIndex(tag => tag.id === action.payload.id);
            
            if (index !== -1) {
              // Remove the item from its current position
              const updatedTag = action.payload;
              const newArray = [...state.TagsAllRecord];
              newArray.splice(index, 1);
              
              // Add the updated item to the beginning of the array
              newArray.unshift(updatedTag);
              
              // Update state immutably
              return {
                ...state,
                TagsAllRecord: newArray,
              };
            }
          
            // Handle case where tag with given ID is not found
            return state;
          }
          
    },
});

export const {setTagsAllRecord,setdeleteTags,addTag,updateTagAction} = mainReducer.actions;

export default mainReducer.reducer;