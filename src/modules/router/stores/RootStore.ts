import GameStore from "../../game/stores/GameStore";
import RouterStore from "./RouterStore";

class RootStore {
  public gameStore: GameStore = new GameStore()
  public routerStore: RouterStore = new RouterStore()
}

export default RootStore
