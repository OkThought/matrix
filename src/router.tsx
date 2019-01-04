import * as React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Matrix from "./game/matrix";
import Home from "./home/home";

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/game/">Play</Link>
          </li>
        </ul>
      </nav>
      <main role="main" className="container">
        <Route path="/" exact component={Home}/>
        <Route path="/game/" exact component={Matrix}/>
      </main>
    </div>
  </Router>
);

export default AppRouter;
