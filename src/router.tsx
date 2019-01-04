import * as React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Matrix from "./game/matrix";
import Home from "./home/home";
import Rules from "./rules/rules";

const AppRouter = () => (
  <Router basename="matrix">
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/game/">Play</Link>
          </li>
          <li>
            <Link to="/rules/">Game Rules</Link>
          </li>
        </ul>
      </nav>
      <main role="main" className="container">
        <Route path="/" exact component={Home}/>
        <Route path="/game/" exact component={Matrix}/>
        <Route path="/rules/" exact component={Rules}/>
      </main>
    </div>
  </Router>
);

export default AppRouter;
