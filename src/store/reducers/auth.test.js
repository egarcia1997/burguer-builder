import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            token: null,
            userId: null,
            error: null,
            cargando: false,
            authRedirectPath: "/",
        };
    });
    it("deberia mostrar el estado inicial", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    it("deberia guardar el token al iniciar sesion", () => {
        expect(reducer(initialState, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: "algun token",
            userId: "algun local id",
        })).toEqual({
            ...initialState,
            token: "algun token",
            userId: "algun local id",
            cargando: false,
            error: null,
        });
    });
});