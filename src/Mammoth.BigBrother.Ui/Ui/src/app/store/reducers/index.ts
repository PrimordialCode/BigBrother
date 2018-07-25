import { ActionReducerMap, createSelector } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { configurationReducer } from "./configuration.reducers";

export const reducers: ActionReducerMap<IAppState> = {
  configuration: configurationReducer
};

export const getConfigurationState = (state: IAppState) => state.configuration;
export const getConfiguration = createSelector(getConfigurationState, (state) => state.configuration);
export const getConfigurationLoaded = createSelector(getConfigurationState, (state) => state.loaded);
