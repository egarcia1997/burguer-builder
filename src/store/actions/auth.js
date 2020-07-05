import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData,
    }
}

const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL,
    }
}

const authStart = (error) => {
    return {
        type: actionTypes.AUTH_START,
        error: error,
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.get()
            .then(response => {
                dispatch(authSuccess());
            }).catch(error => {
                dispatch(authFail(error));
            });
    }
}