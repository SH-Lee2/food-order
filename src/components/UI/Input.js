import React from "react";

import classes from "./Input.module.css";

const Input = ({ name, label, type, step, value, onChange }) => {
    return (
        <div className={classes.input}>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                step={step}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default Input;
