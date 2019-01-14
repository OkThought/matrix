import * as React from "react";
import {BrowserRouter, Link, Route} from "react-router-dom";
import HomeComponent from "../../home/components/HomeComponent";
import RulesComponent from "../../rules/components/RulesComponent";
import {inject, observer} from "mobx-react";
import GameContainer from "../../game/containers/GameContainer";
import RouterStore from "../stores/RouterStore";
import GameLinkForm from "../../game/link/components/GameLinkForm";

interface RouterComponentProps {
  routerStore?: RouterStore
}

@inject('routerStore')
@observer
class RouterComponent extends React.Component<RouterComponentProps> {
  public render(): React.ReactNode {
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
                <div className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                     aria-haspopup="true" aria-expanded="false">Play</a>
                  <div className="dropdown-menu flex-column ">
                    <Link className="dropdown-item" to="/game/radix/10/row/9/size/27/">Classic</Link>
                    <div className="dropdown-divider"/>
                    <h6 className="mx-4">Custom</h6>
                    <GameLinkForm store={this.routerStore.gameLinkFormStore}/>
                  </div>
                </div>
                <Link className="nav-item nav-link" to="/rules/">Rules</Link>
              </nav>
            </div>
          </nav>
          <div role="main" className="container">
            <Route path="/" exact component={HomeComponent}/>
            <Route path="/rules/" exact component={RulesComponent}/>
            <Route path={"/game/radix/:radix([4-9]|[1-2]\\d|3[0-2])" +
                              "/row/:rowSize([3-9]|[1-2]\\d|3[0-2])" +
                              "/size/:initialSize([1-9]\\d?)" +
                              "/(seed/)?:seed?/"}
                   component={GameContainer}/>
          </div>
        </div>
      </BrowserRouter>
    )
  }

  private get routerStore() {
    return this.props.routerStore!
  }
}

export default RouterComponent
