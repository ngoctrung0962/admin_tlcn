import { configureStore } from "@reduxjs/toolkit";
import userReduce from "./userRedux";

export default configureStore({
  reducer: {
    user: userReduce,
  },
});
