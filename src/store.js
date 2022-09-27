import { createSlice, configureStore } from '@reduxjs/toolkit';
import user from './store/userSlice.js'


let cart = createSlice({
  name: 'cart',
  initialState: 
  [
    {id : 0, name: 'PP note', count : 2},
    {id : 2, name: 'oval grid masking tape', count : 1}
  ],
  reducers: {
    addCount(state, action){
      let index = state.findIndex((a)=>{return a.id === action.payload})
      state[index].count++
    },
    addItem(state, action){
      state.push(action.payload)
    }
  }
})

export let { addCount, addItem } = cart.actions

export default configureStore({
  reducer: {
    user : user.reducer,
    cart : cart.reducer,
  }
})