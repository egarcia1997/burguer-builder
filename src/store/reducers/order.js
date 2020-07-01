import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [],
    cargando: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START: 
            return {
                ...state,
                cargando: true,
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                cargando: false,
                orders: state.orders.concat(action.newOrder),
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                cargando: false,
            };
        default:
            return state;
    }
}

export default reducer;