import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export const getActorsStateDictionary = (state: IAppState) => state.actors;
export const getActorsState = (endpointName: string) => createSelector(
  getActorsStateDictionary,
  actorsStateDictionary => actorsStateDictionary[endpointName]
);
export const getActorsHierarchy = (endpointName: string) => createSelector(
  getActorsState(endpointName),
  state => state.hierarchy
);
export const getActorsGlobalCounters = (endpointName: string) => createSelector(
  getActorsState(endpointName),
  state => state.globalCounters
);
export const getSelectedActor = (endpointName: string) => createSelector(
  getActorsState(endpointName),
  state => state.selectedActor
);
export const getActorsActor = (endpointName: string, id: string) => createSelector(
  getActorsState(endpointName),
  state => state.actors != null ? state.actors[id] : null
);
