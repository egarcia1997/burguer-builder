import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState = {
    orders: [],
    cargando: false,
    comprado: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {comprado: false});
        case actionTypes.PURCHASE_BURGER_START: 
            return updateObject(state, {cargando: true});
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, {id: action.orderId});
            return updateObject(state, {
                cargando: false,
                orders: state.orders.concat(newOrder),
                comprado: true,
            });
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, {cargando: false});
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, {cargando: true});
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                cargando: false,
                orders: action.orders,
            });
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, {cargando: false});
        default:
            return state;
    }
}

export default reducer;