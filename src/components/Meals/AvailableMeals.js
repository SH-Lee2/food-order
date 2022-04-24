import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import Card from "../UI/Card";

import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const { isLoading, error, sendRequest: fetchMeals } = useHttp();

    useEffect(() => {
        const transformMeals = (mealsObj) => {
            const loadedMeals = [];
            for (const mealKey in mealsObj) {
                loadedMeals.push({
                    id: mealKey,
                    name: mealsObj[mealKey].name,
                    description: mealsObj[mealKey].description,
                    price: mealsObj[mealKey].price,
                });
            }
            setMeals(loadedMeals);
        };
        fetchMeals(
            {
                url: `https://react-http-3d1cf-default-rtdb.firebaseio.com/meals.json`,
            },
            transformMeals
        );
    }, [fetchMeals]);

    if (isLoading) {
        return (
            <section className={classes.mealsLoading}>
                <p>Loading...</p>
            </section>
        );
    }
    if (error) {
        return (
            <section className={classes.mealsError}>
                <p>{error}</p>
            </section>
        );
    }

    const mealsList = meals.map(({ id, name, description, price }) => (
        <MealItem
            name={name}
            description={description}
            price={price}
            id={id}
            key={id}
        />
    ));
    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
