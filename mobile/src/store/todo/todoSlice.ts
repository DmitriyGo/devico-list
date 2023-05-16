import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {Todo, TodoState} from './types'

const initialState: TodoState = {
  items: [],
  total: 0,
  active: 0,
  completed: 0,
  totalPages: 0,
  currentPage: 1,
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
    setTodos: (state, action: PayloadAction<TodoState>) => {
      const items = [...state.items, ...action.payload.items]
      return {...state, ...action.payload, items}
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
    addTodo: (state, action: PayloadAction<Todo>) => {
      if (!state.items.find(i => i._id === action.payload._id)) {
        state.items.unshift(action.payload)
      }
    },
    deleteTodo: (state, action: PayloadAction<Todo[]>) => {
      const deletedTodoIds = action.payload.map(todo => todo._id)
      state.items = state.items.filter(
        todo => !deletedTodoIds.includes(todo._id),
      )
    },
    clearCompleted: state => {
      state.items = state.items.filter(i => !i.completed)
    },
    setNextPage: state => {
      if (state.currentPage < state.totalPages) {
        state.currentPage = state.currentPage + 1
      }
    },
    resetState: () => {
      return initialState
    },
  },
})

export const {
  setLoading,
  setError,
  setTodos,
  resetState,
  setNextPage,
  addTodo,
  editTodo,
  deleteTodo,
  clearCompleted,
} = todoSlice.actions

export default todoSlice.reducer
