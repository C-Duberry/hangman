import { configureStore } from "@reduxjs/toolkit";
import wordReduceer from "../redux/wordSlice";

export default configureStore({
  reducer: {
    word: wordReduceer,
  },
});
