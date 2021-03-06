//random meal component
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom'
import axios from "axios";
import './Random.css';

const RandomMeal = () => {
  const history = useHistory();
  const initialState = '';
  const [mealType, setmealType] = useState('');
  const [randomMeal, setMeal] = useState('');
  const updateNotificationRef = useRef();


  useLayoutEffect(() => {
    fetch("https://food-random-app.herokuapp.com/isUserAuth", {
        headers: {
            "access-token": localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(data => data.isLoggedIn ?  null : history.push("/login"))
        .catch(err => console.log(err))
}, [history])

  useEffect(() => {
    // Skipping the initial render. TODO: use a better solution from https://stackoverflow.com/questions/53179075/with-useeffect-how-can-i-skip-applying-an-effect-upon-the-initial-render
    if (randomMeal === initialState) {
      return;
    }
    updateNotificationRef.current.animate(
      {
        opacity: [0, 1]
      },
      500
    );
  }, [randomMeal]);


  const getMeal = async () => {
    try {
      let res = await axios.get(`https://food-random-app.herokuapp.com/randomMeal`, { params: { meal_type: mealType } });
      setMeal('We recommend you eat: ' + res.data);
    } catch (e) {
      console.log(e);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    getMeal();

  }

  const logout = () => {
    localStorage.removeItem("token")
    history.push("login")
  }

  return (
    <div id="container" className="text-light" >
      <div id="middle">
        <div className=" d-md-inline form-check text-light">
          <h1>Can't decide on what to eat?<br /><p id="double">I can help</p></h1>
          <h1 className="pt-3"> Choose a meal type</h1>
        </div>

        <form onSubmit={handleSubmit} className="d-md-inline form-group">
          <input type="submit" value="Breakfast" className="m-3 btn btn-light btn-md" onClick={() => setmealType('Breakfast')} />
          <input type="submit" value="Lunch" className="m-3 btn btn-light btn-md" onClick={() => setmealType('Lunch')} />
          <input type="submit" value="Dinner" className="m-3 btn btn-light btn-md" onClick={() => setmealType('Dinner')} />
        </form>
        <h1 ref={updateNotificationRef}>{randomMeal}</h1>
        <form className="fixed-bottom" onSubmit={logout}>
          <input type="submit" value="Logout" className="m-3 btn btn-light btn-md" />
        </form>
      </div>
    </div>
  );
};

export default RandomMeal