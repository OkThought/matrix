import "bootstrap/js/src/index"
import "bootstrap/js/src/util"
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route} from "react-router-dom";

import Home from "./components/home";
import Matrix from "./components/matrix";
import Rules from "./components/rules";

import './styles/styles.sass';

const root = document.getElementById('root');
const Index = () => (
  <BrowserRouter basename="matrix">
    <div className='Index h-100'>
      <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-nav"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="main-nav">
          <nav className="container navbar-nav justify-content-start">
            <Link className="navbar-brand nav-item nav-link" to="/">Matrix</Link>
            <Link className="nav-item nav-link" to="/game/">Play</Link>
            <Link className="nav-item nav-link" to="/rules/">Rules</Link>
          </nav>
        </div>
      </nav>
      <div role="main" className="container">
        <Route path="/" exact component={Home}/>
        <Route path="/game/" exact component={Matrix}/>
        <Route path="/rules/" exact component={Rules}/>
      </div>
    </div>
  </BrowserRouter>
);

ReactDOM.render(<Index/>, root);
// registerServiceWorker();
