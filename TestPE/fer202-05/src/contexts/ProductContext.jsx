import { createContext, useContext, useReducer } from 'react';

const ProductContext = createContext();

const productReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'UPDATE_STOCK':
            return {
                ...state,
                products: state.products.map(p =>
                    p.id === action.payload.id ? { ...p, stock: p.stock - 1 } : p
                )
            };
        default:
            return state;
    }
};

export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, { products: [] });
    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
