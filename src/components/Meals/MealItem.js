import React, { useContext } from "react";
import CartContext from "../../store/cart-context";

import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = ({ name, description, price, id }) => {
    const ctx = useContext(CartContext);

    const addToCartHandler = (amount) => {
        const item = {
            name,
            description,
            price,
            id,
            amount,
        };
        ctx.addItem(item);
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} id={id} />
            </div>
        </li>
    );
};

export default MealItem;
