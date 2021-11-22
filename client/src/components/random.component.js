import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default class RandomMeal extends Component {
    onSubmit(e){
        e.preventDefault();
        console.log('Form Submitted');
    }
    
    
    render() {
        return (
            <div>
                <div className="form-check">
  <h3>Choose a type of meal:</h3>
  <input className="form-check-input" type="radio" name="mealRadios" id="breakfast" value="option1"/>
  <label className="form-check-label" htmlFor="breakfast">
    Breakfast
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="mealRadios" id="lunch" value="option2"/>
  <label className="form-check-label" htmlFor="lunch">
    Lunch
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="mealRadios" id="dinner" value="option3"/>
  <label className="form-check-label" htmlFor="dinner">
    Dinner
  </label>
</div>

<div className="form-group">
                        <input type="submit" value="Generate Meal" className="btn btn-primary" />
                    </div>
            </div>
        )
    }
}