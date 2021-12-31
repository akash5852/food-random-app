//Photo by <a href="https://unsplash.com/@moniqa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Monika Grabkowska</a> on <a href="https://unsplash.com/s/photos/food-photography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>


import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import './Random.css'
const CreateMeal = () => {
    const [mealType, setmealType] = useState('');
    const [submitted, setSubmitted] = useState('');
    const [mealName, setmealName] = useState('');
    const [task, setTask] = useState('');

    const addMeal = async () => {
        const newmeal = {
            name: mealName,
            mealType: mealType,
        }
        try {
            const res = await axios.post("http://localhost:5000/addMeal", newmeal);
            setSubmitted(res.data);
        } catch (err) {
            console.log(err);
        }

    }

    const deleteMeal = async () => {
        try {
            let res = await axios.delete(`http://localhost:5000/deleteMeal`, { params: { meal_name: mealName, meal_type: mealType } });
            setSubmitted(res.data);
        } catch (err) {
            console.log(err);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (task === 'create') {
            addMeal();
        } else {
            deleteMeal();
        }

        e.target.reset();


    }

    return (

        <div id="container" className="text-light">

            <form onSubmit={handleSubmit}>
                <div className="form-check">
                    <h1>Want to add or remove meals of your own??<br /><p id="double">I can help</p></h1>
                    <h1 className="pt-3"> Choose a meal type</h1>
                    <input className="form-check-input" type="radio" name="mealRadios" id="breakfast" required value="option1" onClick={() => setmealType('Breakfast')} />

                    <label className="form-check-label" htmlFor="breakfast">
                        Breakfast
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="mealRadios" id="lunch" value="option2" onClick={() => setmealType('Lunch')} />
                    <label className="form-check-label" htmlFor="lunch">
                        Lunch
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="mealRadios" id="dinner" value="option3" onClick={() => setmealType('Dinner')} />
                    <label className="form-check-label" htmlFor="dinner">
                        Dinner
                    </label>
                </div>

                <div className="pt-3 form-check">
                    <input required className="form-check-input" type="radio" name="crud" id="create" value="option1" onClick={() => setTask('create')} />
                    <label required className="form-check-label" htmlFor="Create">
                        Create
                    </label>
                </div>

                <div className="form-check">
                    <input required className="form-check-input" type="radio" name="crud" id="delete" value="option2" onClick={() => setTask('delete')} />
                    <label required className="form-check-label" htmlFor="Delete">
                        Delete
                    </label>
                </div>

                <label required>
                    Name:
                    <input required type="text" name="name" onChange={(e) => setmealName(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <h1>{submitted}</h1>
        </div>
    )
}

export default CreateMeal