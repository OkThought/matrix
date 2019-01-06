import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

import Matrix from "./game/matrix";
import Home from "./home/home";
import Rules from "./rules/rules";

import * as styles from './index.sass';

const root = document.getElementById('root');
const Index = () => (
  <div className={styles.Index}>
    <Router basename="matrix">
      <div className="container">
        <div className="row">
          <div className="col-">
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
  </div>
);

ReactDOM.render(<Index/>, root);
// registerServiceWorker();
