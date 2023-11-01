import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    server:"https://smartifier.onrender.com",
    isLoading: true,
    userName: null,
    userToken: null,
    userId:null,
    mpeop:[{__v: 0,_id: "6373375a8f3d293cc082f78f", createdAt: "2022-11-15T06:53:14.937Z", members: ["62d6c7b8f4925109c40a5ae1", "62e00593f164d9c569bd635a", "Saim Türker", "123", true, true], seen: [false, null], updatedAt: "2023-03-13T19:21:50.488Z"}, {__v: 0,_id: "637641950b00d439f0dc9bec", createdAt: "2022-11-17T14:13:41.149Z", members: ["62d6c7b8f4925109c40a5ae1", "633080368a1c1440a9921d99", "Saim Türker", "İzzet Çolakel", true, true], seen: [true, "633080368a1c1440a9921d99"], updatedAt: "2023-01-24T20:07:40.739Z"}, {__v: 0,_id: "63a163b71745f2f3cf9196b8", createdAt: "2022-12-20T07:26:47.334Z", members: ["62d6c7b8f4925109c40a5ae1", "62dfd2cef164d9c569bd58f0", "Saim Türker", "yeni", true, true], seen: [true, "62dfd2cef164d9c569bd58f0"], updatedAt: "2023-05-12T21:40:43.120Z"}, {__v: 0,_id: "63b520b162f91d183571e569", createdAt: "2023-01-04T06:46:09.662Z", members: ["62d6c7b8f4925109c40a5ae1", "62d7f552f5917d2aa2800577", "Saim Türker", "İlayda", true, true], seen: [false, null], updatedAt: "2023-04-03T19:59:55.777Z"}, {__v: 0,_id: "63b6b0bff66407407cb25ada", createdAt: "2023-01-05T11:13:03.646Z", members: ["62d6c7b8f4925109c40a5ae1", "62ffa9566f5d6ae417aadd79", "Saim Türker", "Canberk Atakan", false, true], seen: [], updatedAt: "2023-01-05T11:13:26.005Z"}, {__v: 0,_id: "63fdbf81238c3ba16905a02a", createdAt: "2023-02-28T08:46:57.839Z", members: ["63fdbf0e238c3ba169059fd3", "62d6c7b8f4925109c40a5ae1", "Emre", "Saim Türker", true, true], seen: [true, "62d6c7b8f4925109c40a5ae1"], updatedAt: "2023-04-03T14:31:18.163Z"}],
    peop:[],
    messages:[],
    currentconv:null
  },
  reducers: {
    signIn: (state,action) => {
      state.isLoading=false,
      state.userId=action.payload.userId,
      state.userToken=action.payload.userToken
    
    },
    signOut: (state) => {
        state.isLoading=false,
        state.userId=null,
        state.userToken=null
      
      },
    setmpeop: (state,action) => {
        state.mpeop=action.payload
    },
    setmessages: (state,action) => {
        state.messages=action.payload
    },
    setpeop: (state, action) => {
        state.peop=action.payload

    },
    setcurrentconv: (state, action) => {
        state.currentconv=action.payload

    }
  }
});

// Action creators are generated for each case reducer function
export const { signIn, setmpeop, setpeop,setmessages,setcurrentconv,signOut } = counterSlice.actions;

export default counterSlice.reducer;
