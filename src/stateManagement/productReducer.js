import { actionType } from "./actionType"

export const initialState = {
    loading: false,
    products: [],
    error: false,
    cart: [],
}

export const productReducer = (state, action) => {
    switch (action.type) {
        case actionType.LOADING:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case actionType.SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload, // here we don't copy previous product form state, because initially has no product in state befor running the application.
                error: false,
            };
        case actionType.ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case actionType.ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload] // here we firstly copy the existing products which may avialable in cart, otherwise if there are any product before will be vanish. hawa hoye jabe
            };
        default:
            return state;
    }
}