import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import axios from "axios";
import './Random.css';

const RandomMeal = () => {
  const [mealType, setmealType] = useState('');
  const [randomMeal, setMeal] = useState('');

  const getMeal = async () => {
    try {
      let res = await axios.get(`http://localhost:5000/randomMeal`, { params: { meal_type: mealType } });
      setMeal(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    getMeal();

  }


  return (
    <div className="text-light" >
      <div className="d-md-inline form-check text-light">
        <h1>Can't decide on what to eat?<br/> I can help</h1>
      </div>

      <form onSubmit={handleSubmit} className="d-md-inline form-group">
        <input type="submit" value="Breakfast" className="m-3 btn btn-primary" onClick={() => setmealType('Breakfast')} />
        <input type="submit" value="Lunch" className="m-3 btn btn-primary" onClick={() => setmealType('Lunch')} />
        <input type="submit" value="Dinner" className="m-3 btn btn-primary" onClick={() => setmealType('Dinner')} />
      </form>
      <h1>{randomMeal}</h1>
    </div>
  );
};

export default RandomMeal