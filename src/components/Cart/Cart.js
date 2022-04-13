import React, { Fragment, useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";

const Cart = ({ onConfirm }) => {
    const ctx = useContext(CartContext);

    const addItemHandler = (item) => {
        ctx.addItem(item);
    };
    const removeItemHandler = (id) => {
        ctx.removeItem(id);
    };

    const orderHandler = () => {
        if (ctx.items.length !== 0) {
            console.log("주문!");
        } else {
            console.log("주문 목록이 없습니다.");
        }
    };
    const totalAmount = ctx.totalAmount.toFixed(2);
    return (
        <Fragment>
            <ul className={classes["cart-items"]}>
                <CartItem
                    items={ctx.items}
                    onAddItem={addItemHandler}
                    onRemoveItem={removeItemHandler}
                />
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={onConfirm}>Close</button>
                <button
                    className={`${classes["button--alt"]} ${classes.button}`}
                    onClick={orderHandler}
                >
                    Order
                </button>
            </div>
        </Fragment>
    );
};

export default Cart;
