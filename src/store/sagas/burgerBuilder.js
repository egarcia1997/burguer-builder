import Axios from "../../axios-orders";
import { put } from "redux-saga/effects";
import { setIngredients, fetchIngredientsFailed } from "../actions/index";

export function* initIngredientsSaga(action) {
    try {
        const response = yield Axios.get("https://practica-burger-builder.firebaseio.com/ingredientes.json")
        yield put(setIngredients(response.data));
    } catch (error) {
        yield put(fetchIngredientsFailed());
    }
}