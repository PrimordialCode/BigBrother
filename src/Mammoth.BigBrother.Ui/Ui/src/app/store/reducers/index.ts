import { ActionReducerMap, createSelector } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { configurationReducer } from "./configuration.reducers";
import { actorsReducer } from "./actors.reducers";

export const reducers: ActionReducerMap<IAppState> = {
  configuration: configurationReducer,
  actors: actorsReducer
};

export const getConfigurationState = (state: IAppState) => state.configuration;
export const getConfiguration = createSelector(getConfigurationState, (state) => state.configuration);
export const getConfigurationLoaded = createSelector(getConfigurationState, (state) => state.loaded);
export const getConfigurationEndpoints = createSelector(getConfigurationState, (state) => state.configuration.endpoints);

export const getActorsStateDictionary = (state: IAppState) => state.actors;
