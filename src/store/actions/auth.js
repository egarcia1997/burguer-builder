import * as actionTypes from "./actionTypes";
import Axios from "axios";

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

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBoQ1WAnxZ65FOWjAomu45_8wGXsIx6rT8";
        if (isSignup) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBoQ1WAnxZ65FOWjAomu45_8wGXsIx6rT8";
        }
        Axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess());
            }).catch(error => {
                console.log(error);
                dispatch(authFail(error));
            });
    }
}