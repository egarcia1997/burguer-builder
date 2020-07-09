import * as actionTypes from "./actionTypes";
import Axios from "axios";

const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId,
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}

const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, (+expirationTime) * 1000);
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
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBoQ1WAnxZ65FOWjAomu45_8wGXsIx6rT8";
        }
        Axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }).catch(error => {
                console.log(error);
                // esto es porque axios hace asi
                // mete la response en un objeto error
                // error.response es igual a la response de arriba
                dispatch(authFail(error.response.data.error));
            });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    }
}