import { takeEvery } from "redux-saga/effects"
import { authSaga, logoutSaga, checkAuthTimeoutSaga, authCheckStateSaga } from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_LOGOUT_START, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH, authSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}