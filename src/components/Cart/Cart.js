import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import Checkout from "./Checkout";

const Cart = ({ onClose }) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const ctx = useContext(CartContext);

    const addItemHandler = (item) => {
        ctx.addItem({ ...item, amount: 1 });
    };
    const removeItemHandler = (id) => {
        ctx.removeItem(id);
    };

    const orderHandler = (event) => {
        event.preventDefault();
        setIsCheckout(true);
    };
    const totalAmount = ctx.totalAmount.toFixed(2);
    const hasItems = ctx.items.length > 0;
    const modalActions = (
        <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={onClose}>
                Close
            </button>
            {hasItems && (
                <button className={classes.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );
    return (
        <Modal onClose={onClose}>
            <ul className={classes["cart-items"]}>
                {ctx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        amount={item.amount}
                        id={item.id}
                        onAddItem={addItemHandler.bind(null, item)}
                        onRemoveItem={removeItemHandler.bind(null, item.id)}
                    />
                ))}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${totalAmount}</span>
            </div>
            {isCheckout && <Checkout onClose={onClose} />}
            {!isCheckout && modalActions}
        </Modal>
    );
};

export default Cart;
