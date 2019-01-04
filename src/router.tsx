import * as React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Matrix from "./game/matrix";
import Home from "./home/home";
import Rules from "./rules/rules";

const AppRouter = () => (
  <Router basename="matrix">
    <div className="container">
      <div className="row">
        <div className="col-xsm">
          <nav className="navbar collapse navbar-collapse navbar-light justify-content-md-center">
            <ul className="navbar-nav flex-column">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/game/">Play</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/rules/">Rules</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-sm">
          <main role="main" className="container">
            <Route path="/" exact component={Home}/>
            <Route path="/game/" exact component={Matrix}/>
            <Route path="/rules/" exact component={Rules}/>
          </main>
        </div>
      </div>
    </div>
  </Router>
);

export default AppRouter;
