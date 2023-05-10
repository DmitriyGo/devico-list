import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {Todo, TodoState} from './types'

const initialState: TodoState = {
  items: [],
  total: 0,
  active: 0,
  completed: 0,
  totalPages: 0,
  currentPage: 0,
  isOutdated: false,
  isLoading: false,
  error: null,
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<Error | string>) => {
      state.error = action.payload
    },
    setOutdated: (state, action: PayloadAction<boolean>) => {
      state.isOutdated = action.payload
    },
    setTodos: (state, action: PayloadAction<TodoState>) => {
      return {...state, ...action.payload}
    },
    editTodo: (
      state,
      action: PayloadAction<{
        item: Todo
        active: number
        completed: number
        total: number
      }>,
    ) => {
      state.items = state.items.map(i =>
        i._id === action.payload.item._id ? action.payload.item : i,
      )
      state.active = action.payload.active
      state.completed = action.payload.completed
      state.total = action.payload.total
    },
    resetState: () => {
      return initialState
    },
  },
})

export const {
  setLoading,
  setError,
  setOutdated,
  setTodos,
  resetState,
  editTodo,
} = todoSlice.actions

export default todoSlice.reducer
