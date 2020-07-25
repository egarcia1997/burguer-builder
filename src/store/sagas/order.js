import axios from "../../axios-orders";
import { put } from "redux-saga/effects";
import { purchaseBurgerStart, purchaseBurgerSuccess, purchaseBurgerFail, fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFail } from "../actions/index";

export function* purchaseBurgerSaga(action) {
    yield put(purchaseBurgerStart());
    try {
        const response = yield axios.post("/compras.json?auth=" + action.token, action.orderData);
        yield put(purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(purchaseBurgerFail(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(fetchOrdersStart());
    const params = {
        params: {
            auth: action.token,
            orderBy: "\"userId\"",
            equalTo: "\"" + action.userId + "\"",
        }
    };
    try {
        const response = yield axios.get("/compras.json", params);
        const fetchedData = [];
        for (let key in response.data) {
            fetchedData.push({
                ...response.data[key],
                id: key,
            });
        }
        yield put(fetchOrdersSuccess(fetchedData));
    } catch (error) {
        yield put(fetchOrdersFail(error));
    }
}