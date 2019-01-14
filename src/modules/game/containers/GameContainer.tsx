import * as React from "react";
import {inject, observer, Provider} from "mobx-react";
import GameComponent from "../components/GameComponent";
import RootStore from "../../router/stores/RootStore";

interface GameContainerProps {
  rootStore?: RootStore
  match: {
    params: {
      radix: string
      rowSize: string
      seed?: string
      initialSize: string
    }
  }
}

@inject('rootStore')
@observer
class GameContainer extends React.Component<GameContainerProps> {
  public render(): React.ReactNode {
    return (
      <Provider gameStore={this.gameStore}>
        <GameComponent/>
      </Provider>
    )
  }

  public componentDidUpdate(prevProps: Readonly<GameContainerProps>, prevState: Readonly<{}>, snapshot?: any): void {
    if (super.componentDidUpdate) {
      super.componentDidUpdate(prevProps, prevState, snapshot);
    }
    this.updateGameStoreToMatchUrl()
  }

  public componentDidMount() {
    this.updateGameStoreToMatchUrl()
  }

  private updateGameStoreToMatchUrl() {
    const { radix, rowSize, seed, initialSize } = this.props.match.params

    this.gameStore.radix = parseInt(radix)
    this.gameStore.rowSize = parseInt(rowSize)
    this.gameStore.initialSize = parseInt(initialSize)
    this.gameStore.seed = seed
  }

  private get gameStore() {
    return this.props.rootStore!.gameStore
  }
}

export default GameContainer
