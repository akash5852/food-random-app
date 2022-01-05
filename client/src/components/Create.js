//Photo by <a href="https://unsplash.com/@moniqa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Monika Grabkowska</a> on <a href="https://unsplash.com/s/photos/food-photography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
//create component
import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import './Random.css'

const CreateMeal = () => {
    const initialState = '';
    const [mealType, setmealType] = useState('');
    const [submitted, setSubmitted] = useState('');
    const [mealName, setmealName] = useState('');
    const [task, setTask] = useState('');
    const updateNotificationRef = useRef();
    const history = useHistory();

    useEffect(() => {
        fetch("https://food-random-app.herokuapp.com/isUserAuth", {
            headers: {
                "access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => data.isLoggedIn ? null : history.push("/login"))
            .catch(err => console.log(err))
    }, [history])

    useEffect(() => {
        // Skipping the initial render. TODO: use a better solution from https://stackoverflow.com/questions/53179075/with-useeffect-how-can-i-skip-applying-an-effect-upon-the-initial-render



        if (submitted === initialState) {
            return;
        }
        updateNotificationRef.current.animate(
            {
                opacity: [0, 1]
            },
            500
        );
    }, [submitted]);


    const addMeal = async () => {
        const newmeal = {
            name: mealName,
            mealType: mealType,
        }
        try {
            const res = await axios.post("https://food-random-app.herokuapp.com/addMeal", newmeal);
            setSubmitted(res.data);
        } catch (err) {
            console.log(err);
        }

    }

    const deleteMeal = async () => {
        try {
            let res = await axios.delete(`https://food-random-app.herokuapp.com/deleteMeal`, { params: { meal_name: mealName, meal_type: mealType } });
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
                <h1>Want to add or remove meals of your own??<br /><p id="double">I can help</p></h1>
                <h1 className="pt-3 pb-3"> Add or remove a meal</h1>
                <div className='d-inline-flex'>
                    <div className="form-check">
                        <input className="btn-check" type="radio" name="mealRadios" id="breakfast" autocomplete="off" required onClick={() => setmealType('Breakfast')} />
                        <label className="btn btn-secondary" htmlFor="breakfast">
                            Breakfast
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="btn-check" type="radio" name="mealRadios" id="lunch" autocomplete="off" required onClick={() => setmealType('Lunch')} />
                        <label className="btn btn-secondary" htmlFor="lunch">
                            Lunch
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="btn-check" type="radio" name="mealRadios" id="dinner" autocomplete="off" required onClick={() => setmealType('Dinner')} />
                        <label className="btn btn-secondary" htmlFor="dinner">
                            Dinner
                        </label>
                    </div>
                </div>
                <div className='pt-3 pb-3 d-flex justify-content-center'>
                    <div className="form-check">
                        <input required className="btn-check" type="radio" name="crud" id="create" autocomplete="off" onClick={() => setTask('create')} />
                        <label required className="btn btn-secondary" htmlFor="create">
                            Create
                        </label>
                    </div>

                    <div className="form-check">
                        <input required className="btn-check" type="radio" name="crud" id="delete" autocomplete="off" onClick={() => setTask('delete')} />
                        <label required className="btn btn-secondary" htmlFor="delete">
                            Delete
                        </label>
                    </div>
                </div>
                <label required>
                    Meal Name:
                    <input required type="text" name="name" onChange={(e) => setmealName(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
                <h1 className='pt-4' ref={updateNotificationRef} >{submitted}</h1>
            </form>

        </div>
    )
}

export default CreateMeal