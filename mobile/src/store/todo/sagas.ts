import {PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'

import {httpClient} from '../../helpers'

import {TodoActionTypes} from './actions'
import {setError, setLoading, setOutdated, setTodos} from './todoSlice'
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

    const response: FetchTodoResponse = yield call(
      httpClient.post,
      todoEndpoints.getAllTodos(),
      {
        page: 1,
      },
    )

    yield put(setTodos(response.data))
    yield put(setOutdated(false))
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

    yield call(httpClient.post, todoEndpoints.createTodo(), action.payload)

    yield call(fetchTodosSaga)
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
  action: PayloadAction<string | string[]>,
): Generator<unknown, void, DeleteTodoResponse> {
  try {
    yield put(setLoading(true))

    yield call(httpClient.post, todoEndpoints.deleteTodo(), {
      ids: action.payload,
    })

    yield call(fetchTodosSaga)

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

    yield call(fetchTodosSaga)
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
