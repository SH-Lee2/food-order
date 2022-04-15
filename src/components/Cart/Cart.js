import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";

const Cart = ({ onClose }) => {
    const ctx = useContext(CartContext);

    const addItemHandler = (item) => {
        ctx.addItem({ ...item, amount: 1 });
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
    const hasItems = ctx.items.length > 0;
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
        </Modal>
    );
};

export default Cart;
