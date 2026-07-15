import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();


/* Sửa lại cartReducer trong src/contexts/CartContext.jsx */
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
                    ),
                };
            }
            return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };

        case 'UPDATE_QTY':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? { ...item, qty: action.payload.qty } : item
                )
            };

        default:
            return state;
    }
};


export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });
    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
