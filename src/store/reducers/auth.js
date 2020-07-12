import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../shared/utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    cargando: false,
    authRedirectPath: "/",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, {
                cargando: true,
                error: null,
            });
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, {
                token: action.idToken,
                userId: action.userId,
                cargando: false,
                error: null,
            });
        case actionTypes.AUTH_FAIL:
            return updateObject(state, {
                cargando: false,
                error: action.error,
            });
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, {
                token: null,
                userId: null,
            });
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return updateObject(state, {
                authRedirectPath: action.path,
            });
        default:
            return state;
    }
}

export default reducer;