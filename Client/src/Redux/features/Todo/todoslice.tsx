import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],  // Make sure this is initialized as an empty array
  loading: false,
  error: null,
};

import { config } from '../../../config';
const BASE_URL = config.API_URL;

// thunks 
export const fetchTodos = createAsyncThunk<Todo[], void, { rejectValue: string }>(
    "todos/fetchTodos",
    async (_, thunkAPI) => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/todos/getTodos`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(res.data)) {
          return res.data;
        }
        
        return res.data.todos;
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch todos");
        }
        return thunkAPI.rejectWithValue("An unknown error occurred while fetching todos");
      }
    }
  );

export const addTodo = createAsyncThunk<Todo, { title: string }, { rejectValue: string }>(
  "todos/addTodo",
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${BASE_URL}/todos/addTodo`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.todo;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to add todo");
      }
      return thunkAPI.rejectWithValue("An unknown error occurred while adding todo");
    }
  }
);

export const deleteTodo = createAsyncThunk<string, string, { rejectValue: string }>(
  "todos/deleteTodo",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/todos/deleteTodo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete todo");
      }
      return thunkAPI.rejectWithValue("An unknown error occurred while deleting todo");
    }
  }
);

export const updateTodo = createAsyncThunk<
  Todo,
  { id: string; updatedData: { title?: string; completed?: boolean } },
  { rejectValue: string }
>(
  "todos/updateTodo",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${BASE_URL}/todos/updateTodo/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.todo;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update todo");
      }
      return thunkAPI.rejectWithValue("An unknown error occurred while updating todo");
    }
  }
);

//Slices

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Todos    
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Error fetching todos";
      })

      // Add todos
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.loading = false;
        // Ensure todos array exists before pushing
        if (!state.todos) {
          state.todos = [];
        }
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Error adding todo";
      })

      // Delete todos
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        if (state.todos) {
          state.todos = state.todos.filter((todo) => todo._id !== action.payload);
        }
      })
      .addCase(deleteTodo.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Error deleting todo";
      })

      // Update todos
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.loading = false;
        if (state.todos) {
          const index = state.todos.findIndex((t) => t._id === action.payload._id);
          if (index !== -1) {
            state.todos[index] = action.payload;
          }
        }
      })
      .addCase(updateTodo.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Error updating todo";
      });
  },
});

export default todoSlice.reducer;