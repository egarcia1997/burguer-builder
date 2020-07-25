import Axios from "axios";
import { put } from "redux-saga/effects"
import { delay } from "redux-saga/effects";
import { authStart, authSuccess, authFail, checkAuthTimeout, logoutSucceed, logout } from "../actions/index";

export function* logoutSaga(action) {
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("expirationDate");
    yield localStorage.removeItem("userId");
    yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(logout());
}

export function* authSaga(action) {
    yield put(authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true,
    }
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBoQ1WAnxZ65FOWjAomu45_8wGXsIx6rT8";
    if (action.isSignup) {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBoQ1WAnxZ65FOWjAomu45_8wGXsIx6rT8";
    }
    try {
        const response = yield Axios.post(url, authData);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem("token", response.data.idToken);
        yield localStorage.setItem("expirationDate", expirationDate);
        yield localStorage.setItem("userId", response.data.localId);
        yield put(authSuccess(response.data.idToken, response.data.localId));
        yield put(checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        console.log(error);
        // esto es porque axios hace asi
        // mete la response en un objeto error
        // error.response es igual a la response de arriba
        yield put(authFail(error.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem("token");
    if (!token) {
        yield put(logout());
    }
    else {
        const expirationDate = yield new Date(localStorage.getItem("expirationDate"));
        if (expirationDate <= new Date()) {
            yield put(logout());
        }
        else {
            yield put(authSuccess(token, localStorage.getItem("userId")));
            yield put(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}