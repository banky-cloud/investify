import { createSlice } from "@reduxjs/toolkit";

const siteSlice= createSlice({
    name:"siteData",
    initialState:{
            siteData:{
                allTransactions:[],
                allUsers:[]
            }
    },
    reducers:{
        setSiteData:(state, action)=>{
            state.siteData=action.payload
        }
    }

})


export const {setSiteData}= siteSlice.actions;
export const    selectSiteData= (state)=>state.siteData.siteData
export default siteSlice.reducer