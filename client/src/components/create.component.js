import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const CreateMeal = () => {
    const [mealType, setmealType] = useState('');
    const [submitted, setSubmitted] = useState('');
    const [mealName, setmealName] = useState('');

    const addMeal = async () =>{
        const newmeal = {
            name: mealName,
            mealType: mealType,
        }
        try {
            const res = await axios.post("http://localhost:5000/addMeal",newmeal);
            setSubmitted(res.data);
        } catch (err) {
            console.log(err);
        }
       
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        addMeal(); 
        setmealType('');
        setmealName('');
        e.target.reset();


    }

    return (
        <div>
            <h1> CREATE MEAL</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-check">
                    <h3>Choose a type of meal:</h3>
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
                <label required>
                    Name:
                    <input required type="text" name="name" onChange={(e) => setmealName(e.target.value)}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
            <h1>{submitted}</h1>
        </div>
    )
}

export default CreateMeal