import * as React from "react";
import {inject, observer} from "mobx-react";
import Game from "../components/Game";
import RootStore from "../../router/stores/RootStore";

interface GameContainerProps {
  rootStore?: RootStore
  match: {
    params: {
      radix: string
      rowSize: string
      initialSize: string
      seed?: string
    }
  }
}

@inject('rootStore')
@observer
class GameContainer extends React.Component<GameContainerProps> {
  public render(): React.ReactNode {
    return (
      <Game gameStore={this.gameStore}/>
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
