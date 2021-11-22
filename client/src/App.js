import React, { Component } from "react";
import { BrowserRouter as Router,Route, Link } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";

import CreateMeal from "./components/create.component";
import RandomMeal from "./components/random.component";
class App extends Component {
  render() {
    return (
      <Router>
         <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Random Meal App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/addMeal" className="nav-link">Create Meal</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
        <Route path="/addMeal" component={CreateMeal} />
        <Route path="/" exact component={RandomMeal} />
        
        </div>
        
      </Router>
    );
  }
}

export default App;