import * as React from "react";
import RootStore from "../stores/RootStore";
import MatrixRouter from "../components/MatrixRouter";
import {inject, Provider} from "mobx-react";

interface RouterContainerProps {
  rootStore?: RootStore
}

@inject('rootStore')
export default class RouterContainer extends React.Component<RouterContainerProps> {
  public render(): React.ReactNode {
    const { routerStore } = this.props.rootStore!
    return (
      <Provider routerStore={routerStore}>
        <MatrixRouter/>
      </Provider>
    )
  }
}
