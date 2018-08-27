import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export const getConfigurationState = (state: IAppState) => state.configuration;
export const getConfiguration = createSelector(getConfigurationState, (state) => state.configuration);
export const getConfigurationLoaded = createSelector(getConfigurationState, (state) => state.loaded);
export const getConfigurationEndpoints = createSelector(getConfigurationState, (state) => state.configuration.endpoints);
