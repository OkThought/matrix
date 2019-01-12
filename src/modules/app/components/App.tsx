import * as React from "react";
import {BrowserRouter, Link, Route} from "react-router-dom";
import HomeComponent from "../../home/components/HomeComponent";
import GameComponent from "../../game/components/GameComponent";
import RulesComponent from "../../rules/components/RulesComponent";
import ApplicationStore from "../stores/ApplicationStore";
import {inject, observer, Provider} from "mobx-react";

interface AppProps {
  store?: ApplicationStore
}

@inject('store')
@observer
class App extends React.Component<AppProps, {}> {
  public render(): React.ReactNode {
    const store = this.props.store!

    return (
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
            <Route path="/" exact component={HomeComponent}/>
            <Route path="/game/" exact
                   render={() => (
                     <Provider store={store.gameStore}>
                      <GameComponent/>
                     </Provider>
                   )}/>
            <Route path="/rules/" exact component={RulesComponent}/>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
