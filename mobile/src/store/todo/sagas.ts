import {PayloadAction} from '@reduxjs/toolkit'
import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'

import {httpClient} from '../../helpers'

import {TodoActionTypes} from './actions'
import {addTodo, deleteTodo, setError, setLoading, setTodos} from './todoSlice'
import {
  CreateTodoResponse,
  DeleteTodoResponse,
  FetchTodoResponse,
  Todo,
  todoEndpoints,
  TodoState,
  UpdateTodoResponse,
} from './types'

export function* fetchTodosSaga(): Generator<
  unknown,
  void,
  FetchTodoResponse & TodoState
> {
  try {
    yield put(setLoading(true))

    const {items} = yield select(state => state.todo)

    const response: FetchTodoResponse = yield call(
      httpClient.post,
      todoEndpoints.getAllTodos(),
      {
        skip: items.length,
        sorting: [{field: 'createdAt', sort: 'desc'}],
      },
    )

    yield put(setTodos(response.data))
  } catch (error) {
    yield put(setError(error as Error))
  } finally {
    yield put(setLoading(false))
  }
}

export function* addTodoSaga(
  action: PayloadAction<Todo>,
): Generator<unknown, void, CreateTodoResponse> {
  try {
    yield put(setLoading(true))

    const response = yield call(
      httpClient.post,
      todoEndpoints.createTodo(),
      action.payload,
    )

    yield put(addTodo(response.data))
  } catch (error) {
    yield put(setError(error as Error))
  } finally {
    yield put(setLoading(false))
  }
}

export function* updateTodoSaga(
  action: PayloadAction<Todo>,
): Generator<unknown, void, UpdateTodoResponse> {
  try {
    yield put(setLoading(true))

    yield call(
      httpClient.put,
      todoEndpoints.updateTodo(action.payload._id),
      action.payload,
    )
  } catch (error) {
    yield put(setError(error as Error))
  } finally {
    yield put(setLoading(false))
  }
}

export function* removeTodoSaga(
  action: PayloadAction<string>,
): Generator<unknown, void, DeleteTodoResponse> {
  try {
    yield put(setLoading(true))

    yield call(httpClient.post, todoEndpoints.deleteTodo(), {
      ids: action.payload,
    })

    yield put(deleteTodo(action.payload))

    // const count = Array.isArray(action.payload) ? action.payload.length : 1
    // const message =
    //   count > 1
    //     ? `${count} items have been successfully removed`
    //     : 'One item has been successfully removed'
  } catch (error) {
    yield put(setError(error as Error))
  } finally {
    yield put(setLoading(false))
  }
}

export function* clearCompletedTodosSaga() {
  try {
    yield put(setLoading(true))

    yield call(httpClient.delete, todoEndpoints.clearCompleted())
  } catch (error) {
    yield put(setError(error as Error))
  } finally {
    yield put(setLoading(false))
  }
}

export function* todoSaga() {
  yield takeLatest(TodoActionTypes.fetchTodos, fetchTodosSaga)
  yield takeEvery(TodoActionTypes.addTodo, addTodoSaga)
  yield takeEvery(TodoActionTypes.updateTodo, updateTodoSaga)
  yield takeEvery(TodoActionTypes.removeTodo, removeTodoSaga)
  yield takeEvery(TodoActionTypes.clearCompleted, clearCompletedTodosSaga)
}
