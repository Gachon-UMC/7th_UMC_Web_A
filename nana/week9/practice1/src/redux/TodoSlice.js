import {createSlice} from '@reduxjs/toolkit'

let nextId =0;
const initialState = [];

export const TodoSlice = createSlice({
    name : 'Todofunction',
    initialState,
    reducers:{
        add : (state,action) => {
            nextId++;
            state.push({
                id : nextId,
                text : action.payload,
                complete : false,
            })
    },   
    remove : (state, action) =>{
        return state.filter(e => e.id !== action.payload)
    },

    complete : (state, action) =>{
        return state.map(e => e.id === action.payload ? {...e, complete : !e.complete} : e)
    }


}
})

export const {add , remove, complete} = TodoSlice.actions
export default TodoSlice.reducer