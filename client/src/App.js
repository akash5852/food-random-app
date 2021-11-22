import React, { Component } from "react";
import { BrowserRouter as Router,Routes , Route, Link } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";

import MealsList from "./components/list.component";
import RandomMeal from "./components/random.component";
import CreateMeal from "./components/create.component";

class App extends Component {
  render() {
    return (
      <Router>
         <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/randomMeal" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/addMeal" className="nav-link">Create Todo</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          
        <Routes>
        <Route path="/" exact component={MealsList} />
        <Route path="/randomMeal" component={RandomMeal} />
        <Route path="/addMeal" component={CreateMeal} />
        </Routes>
        </div>
        
      </Router>
    );
  }
}

export default App;