import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authslice";
import todoReducer from "../features/Todo/todoslice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
