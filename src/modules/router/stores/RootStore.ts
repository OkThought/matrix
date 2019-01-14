import GameStore from "../../game/stores/GameStore";

class RootStore {
  public gameStore: GameStore = new GameStore()
}

export default RootStore
