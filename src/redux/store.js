import { configureStore } from "@reduxjs/toolkit";
import typingSlice from "./typingApp/typingSlice";

export const store = configureStore({
    reducer:{
        typing: typingSlice
    },
})