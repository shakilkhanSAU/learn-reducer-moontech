import React, { useEffect, useReducer } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { actionType } from '../stateManagement/actionType';
import { initialState, productReducer } from '../stateManagement/productReducer';


const PRODUCT_CONTEXT = createContext();

const ProductProvider = ({ children }) => {
    // const [data, setData] = useState([])
    const [state, dispatch] = useReducer(productReducer, initialState)

    useEffect(() => {
        dispatch({ type: actionType.LOADING })
        fetch('https://raw.githubusercontent.com/shakilkhanSAU/dammy-product-data/main/data')
            .then(res => res.json())
            .then(data => dispatch({
                type: actionType.SUCCESS,
                payload: data
            })).catch(() => {
                dispatch({ type: actionType.ERROR })
            })
    }, [])

    const value = {
        state,
        dispatch,
    }

    return (
        <PRODUCT_CONTEXT.Provider value={value}>
            {children}
        </PRODUCT_CONTEXT.Provider>
    );
};

// make a single hook, so that you can now call data using this hook rather than calling useContext everytime [const data = useContext(PRODUCT_CONTEXT);]

// custom hook for products
export const useProducts = () => {
    const context = useContext(PRODUCT_CONTEXT)
    return context;
}

export default ProductProvider;