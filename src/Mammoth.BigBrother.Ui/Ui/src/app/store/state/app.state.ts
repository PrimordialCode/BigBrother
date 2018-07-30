import { IConfigurationState, initialConfigurationState } from "./configuration.state";
import { IActorsStateDictionary, initialActorsState } from "./actors.state";

export interface IAppState {
  configuration: IConfigurationState;
  actors: IActorsStateDictionary;
}

export const initialAppState: IAppState = {
  configuration: initialConfigurationState,
  actors: initialActorsState
};
