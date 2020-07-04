import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [],
    cargando: false,
    comprado: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                comprado: false,
            };
        case actionTypes.PURCHASE_BURGER_START: 
            return {
                ...state,
                cargando: true,
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }
            return {
                ...state,
                cargando: false,
                orders: state.orders.concat(newOrder),
                comprado: true,
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                cargando: false,
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                cargando: true,
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                cargando: false,
                orders: action.orders,
            };
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                cargando: false,
            };
        default:
            return state;
    }
}

export default reducer;