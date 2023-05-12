import AsyncStorage from '@react-native-async-storage/async-storage'

import {PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeEvery, select} from 'redux-saga/effects'

import {AuthActionTypes} from './actions'
import {setAccessToken, setError, setLoading, setUser} from './authSlice'
import {authEndpoints, IAuthResponse, ILoginDTO, IRegisterDTO} from './types'
import sockets from '../socket'

import {httpClient} from './../../helpers'
import {resetState} from '../todo'

export function* registerSaga(
  action: PayloadAction<IRegisterDTO>,
): Generator<unknown, void, IAuthResponse> {
  try {
    yield put(setLoading(true))

    const response = yield call(
      httpClient.post,
      authEndpoints.register(),
      action.payload,
    )

    yield put(setUser(response.data.user))
    yield put(setAccessToken(response.data.accessToken))

    AsyncStorage.setItem('authorized', 'true')
  } catch (error) {
    yield put(setError(error as Error))
  } finally {
    yield put(setLoading(false))
  }
}

export function* loginSaga(
  action: PayloadAction<ILoginDTO>,
): Generator<unknown, void, IAuthResponse> {
  try {
    const response = yield call(
      httpClient.post,
      authEndpoints.login(),
      action.payload,
    )

    yield put(setLoading(true))

    yield put(setUser(response.data.user))
    yield put(setAccessToken(response.data.accessToken))

    sockets.emit('auth', response.data.user)

    AsyncStorage.setItem('authorized', 'true')
  } catch (error) {
    yield put(setError(error as Error))
  } finally {
    yield put(setLoading(false))
  }
}

export function* logoutSaga(): Generator<unknown, void, IAuthResponse> {
  try {
    yield put(setLoading(true))
    const user = yield select(state => state.auth.user)

    yield call(httpClient.post, authEndpoints.logout())
    sockets.emit('logout', user)

    yield put(setUser(null))
    yield put(resetState())

    AsyncStorage.removeItem('authorized')
  } catch (error) {
    yield put(setError(error as Error))
  } finally {
    yield put(setLoading(false))
  }
}

export function* checkAuthSaga(): Generator<unknown, void, IAuthResponse> {
  try {
    const authorized = yield call(AsyncStorage.getItem, 'authorized')

    if (!authorized) {
      return
    }

    yield put(setLoading(true))

    const response = yield call(httpClient.post, authEndpoints.refresh())
    sockets.emit('login', response.data.user)

    yield put(setUser(response.data.user))
    yield put(setAccessToken(response.data.accessToken))
  } catch (error) {
    yield put(setError(error as Error))
  } finally {
    yield put(setLoading(false))
  }
}

export function* authSaga() {
  yield takeEvery(AuthActionTypes.register, registerSaga)
  yield takeEvery(AuthActionTypes.login, loginSaga)
  yield takeEvery(AuthActionTypes.logout, logoutSaga)

  yield checkAuthSaga()
}
