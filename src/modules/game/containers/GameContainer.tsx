import * as React from "react";
import {inject, observer, Provider} from "mobx-react";
import GameComponent from "../components/GameComponent";
import RootStore from "../../router/stores/RootStore";

interface GameContainerProps {
  store?: RootStore
  match: {
    params: {
      radix: string
      rowSize: string
      seed?: string
      initialSize: string
    }
  }
}

@inject('store')
@observer
class GameContainer extends React.Component<GameContainerProps> {
  public componentDidUpdate(prevProps: Readonly<GameContainerProps>, prevState: Readonly<{}>, snapshot?: any): void {
    if (super.componentDidUpdate) {
      super.componentDidUpdate(prevProps, prevState, snapshot);
    }
    this.updateGameStoreToMatchUrl()
  }

  public componentDidMount() {
    this.updateGameStoreToMatchUrl()
  }

  public render(): React.ReactNode {
    const { gameStore } = this.props.store!
    return (
      <Provider store={gameStore}>
        <GameComponent/>
      </Provider>
    )
  }

  private updateGameStoreToMatchUrl() {
    const { gameStore } = this.props.store!
    const { radix, rowSize, seed, initialSize } = this.props.match.params

    gameStore.radix = parseInt(radix)
    gameStore.rowSize = parseInt(rowSize)
    gameStore.initialSize = parseInt(initialSize)
    gameStore.seed = seed
  }
}

export default GameContainer
