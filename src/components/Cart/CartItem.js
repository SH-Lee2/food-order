import React, { Fragment } from "react";

import classes from "./CartItem.module.css";

const CartItem = ({ items, onAddItem, onRemoveItem }) => {
    const addItemHandler = (item) => {
        onAddItem({ ...item, amount: 1 });
    };
    const removeItemHandler = (id) => {
        onRemoveItem(id);
    };
    const content = items.map((item) => (
        <li className={classes["cart-item"]} key={item.id}>
            <div>
                <h2>{item.name}</h2>
                <div className={classes.summary}>
                    <span className={classes.price}>${item.price}</span>
                    <span className={classes.amount}>x {item.amount}</span>
                </div>
            </div>
            <div>
                <button onClick={() => removeItemHandler(item.id)}>-</button>
                <button onClick={() => addItemHandler(item)}>+</button>
            </div>
        </li>
    ));
    return <Fragment>{content}</Fragment>;
};

export default CartItem;
