import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: { name: 'kim', age : 20 },
  reducers : {
    changeName(state){
      // return { name: 'park', age : 20 }
      state.name = 'park'
    },
    changeAge(state, action){
      state.age += action.payload //payload 화물 소포같이 보내는 짐이라는 의미
    }
  }
})

// 위 user함수에서 값 빼내는 법
export let { changeName, changeAge } = user.actions

export default user