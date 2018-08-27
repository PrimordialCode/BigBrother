import { IConfigurationState, initialConfigurationState } from "./configuration.state";
import { IActorsStateDictionary, initialActorsState } from "./actors.state";
import { RouterReducerState } from "@ngrx/router-store";
import { IRouterStateUrl } from "../router/router";

export interface IAppState {
  configuration: IConfigurationState;
  actors: IActorsStateDictionary;
  router: RouterReducerState<IRouterStateUrl>;
}

export const initialAppState: IAppState = {
  configuration: initialConfigurationState,
  actors: initialActorsState,
  router: null
};
