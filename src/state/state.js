import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice"
import siteSlice from "./slices/siteSlice";
const store= configureStore({
    reducer:{
        user:userSlice,
        siteData:siteSlice
    }
})

export default store