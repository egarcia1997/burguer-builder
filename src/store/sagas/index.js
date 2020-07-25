import { takeEvery } from "redux-saga/effects"
import { logout } from "./auth";
import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_LOGOUT_START, logout);
}