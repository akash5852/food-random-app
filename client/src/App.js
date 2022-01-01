import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";

import CreateMeal from "./components/create.component";
import RandomMeal from "./components/random.component";
class App extends Component {
  render() {
    return (
      <div id = "fullDiv">
      <Router>
          <div id ="landingcontainer">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Meal Idea Generator</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/addMeal" className="nav-link">Add or Delete Meals</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/addMeal" component={CreateMeal} />
          <Route path="/" exact component={RandomMeal} />
          </div>
      </Router >

      </div>
    );
  }
}

export default App;