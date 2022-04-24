import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const totalAmount =
            state.totalAmount + action.item.price * action.item.amount;
        if (existingItemIndex === -1) {
            return { items: [...state.items, action.item], totalAmount };
        } else {
            // 아이템이 있다면 찾은 아이템의 수량만 변경 해준다.
            state.items[existingItemIndex].amount += action.item.amount;
            return { items: [...state.items], totalAmount };
        }
    }
    if (action.type === "REMOVE") {
        // amount -1 했을때 0이 아닌경우
        const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const totalAmount =
            state.totalAmount - state.items[existingItemIndex].price;
        if (state.items[existingItemIndex].amount - 1 !== 0) {
            state.items[existingItemIndex].amount -= 1;
            return { items: [...state.items], totalAmount };
        } else {
            // 0인경우
            const newItems = state.items.filter(
                (item) => item.id !== action.id
            );
            return {
                items: [...newItems],
                totalAmount: totalAmount > 0 ? totalAmount : 0,
            };
        }
    }
    if (action.type === "CLEAR") {
        return defaultCartState;
    }
    // 매우중요!!!!!!!!!!!!!!!
    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: "ADD", item });
    };
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: "REMOVE", id });
    };
    const clearCartHandler = () => {
        dispatchCartAction({ type: "CLEAR" });
    };
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
