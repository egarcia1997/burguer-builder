import { takeEvery, all, takeLatest } from "redux-saga/effects"
import { authSaga, logoutSaga, checkAuthTimeoutSaga, authCheckStateSaga } from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import { purchaseBurgerSaga, fetchOrdersSaga } from "./order";
import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
    // con all todas estas funciones se ejecutan en paralelo
    yield all([
        takeEvery(actionTypes.AUTH_LOGOUT_START, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH, authSaga),
        takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga),
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    // con takeLatest cancela las sagas que se estan ejecutando al lanzar una nueva
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}