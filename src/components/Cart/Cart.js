import React, { Fragment, useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = ({ onClose }) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [isBack, setIsBack] = useState(false);
    const { isLoading, error, sendRequest: fetchOrder } = useHttp();
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

    const submitOrderHandler = (userData) => {
        fetchOrder({
            url: `https://react-http-3d1cf-default-rtdb.firebaseio.com/orders.json`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: { user: userData, orderedItems: ctx.items },
        });
        setIsBack(false);
        setDidSubmit(true);
    };

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
    const cartModalContent = (
        <Fragment>
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
            {isCheckout && (
                <Checkout onClose={onClose} onSubmit={submitOrderHandler} />
            )}
            {!isCheckout && modalActions}
        </Fragment>
    );

    const isSubmittingModalContent = (
        <Fragment>
            <p>Sending order data...</p>
        </Fragment>
    );
    const didSubmitModalContent = (
        <Fragment>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={onClose}>
                    Close
                </button>
            </div>
        </Fragment>
    );
    const backBtnHandler = () => {
        setIsBack(true);
        setDidSubmit(false);
    };
    const errorModalContent = (
        <Fragment>
            <p>{error}</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={backBtnHandler}>
                    back
                </button>
            </div>
        </Fragment>
    );
    // https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning
    useEffect(() => {
        if (didSubmit && !isLoading && !error) {
            ctx.clearCart();
        }
    }, [didSubmit, isLoading, error, ctx]);

    return (
        <Modal onClose={onClose}>
            {(!isLoading && !didSubmit && cartModalContent) ||
                (!isLoading && !didSubmit && isBack && cartModalContent)}
            {isLoading && isSubmittingModalContent}
            {!isLoading && error && !isBack && errorModalContent}
            {!isLoading && !error && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;
