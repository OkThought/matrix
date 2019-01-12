import * as React from "react";
import {inject, observer, Provider} from "mobx-react";
import GameComponent from "../components/GameComponent";
import RootStore from "../../router/stores/RootStore";

interface GameContainerProps {
  store?: RootStore
}

@inject('store')
@observer
class GameContainer extends React.Component<GameContainerProps> {
  public render(): React.ReactNode {
    const store = this.props.store!
    return (
      <Provider store={store.gameStore}>
        <GameComponent/>
      </Provider>
    )
  }
}

export default GameContainer
