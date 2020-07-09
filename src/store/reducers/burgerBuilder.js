import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    construyendo: false,
}

const PRECIOS_INGREDIENTES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7,
}

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + PRECIOS_INGREDIENTES[action.ingredientName],
        construyendo: true,
    };
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        construyendo: true,
        totalPrice: state.totalPrice - PRECIOS_INGREDIENTES[action.ingredientName],
    };
    return updateObject(state, updatedState);
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4,
                construyendo: false,
            });
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true});
        default:
            return state;
    }
}

export default reducer;