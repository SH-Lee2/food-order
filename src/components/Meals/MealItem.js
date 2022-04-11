import React from "react";

import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = ({ name, description, price }) => {
    return (
        <div className={classes.meal}>
            <div>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <MealItemForm />
        </div>
    );
};

export default MealItem;
