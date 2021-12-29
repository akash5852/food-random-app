import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import axios from "axios";

const RandomMeal = () => {
  const [mealType, setmealType] = useState('');
  const [randomMeal, setMeal] = useState('');

  const getMeal = async () => {
    let res = await axios.get(`http://localhost:5000/randomMeal`, { params: { meal_type: mealType } });
    setMeal(res.data);
    return res.data;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    getMeal();

  }


  return (
    <div>
      <div className="form-check">
        <h3>Choose a type of meal:</h3>
        <input className="form-check-input" type="radio" name="mealRadios" id="breakfast" value="option1" checked={mealType === 'Breakfast'} onClick={() => setmealType('Breakfast')} />

        <label className="form-check-label" htmlFor="breakfast">
          Breakfast
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="mealRadios" id="lunch" value="option2" checked={mealType === 'Lunch'} onClick={() => setmealType('Lunch')} />
        <label className="form-check-label" htmlFor="lunch">
          Lunch
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="mealRadios" id="dinner" value="option3" checked={mealType === 'Dinner'} onClick={() => setmealType('Dinner')} />
        <label className="form-check-label" htmlFor="dinner">
          Dinner
        </label>
      </div>

      <form onSubmit={handleSubmit} className="form-group">
        <input type="submit" value="Generate Meal" className="btn btn-primary" />
      </form>
      <h1>{randomMeal}</h1>
    </div>
  );
};

export default RandomMeal