import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export const getActorsStateDictionary = (state: IAppState) => state.actors;
export const getActorsState = createSelector(
  getActorsStateDictionary,
  actorsStateDictionary => (endpointName: string) => actorsStateDictionary[endpointName]
);
export const getActorsHierarchy = createSelector(
  getActorsState,
  state => (endpointName: string) => state(endpointName).hierarchy
);
export const getActorsGlobalCounters = createSelector(
  getActorsState,
  state => (endpointName: string) => state(endpointName).globalCounters
);
export const getSelectedActor = createSelector(
  getActorsState,
  state => (endpointName: string) => state(endpointName).selectedActor
);
export const getActorsActor = createSelector(
  getActorsState,
  state => (endpointName: string, id: string) => {
    const actors = state(endpointName).actors;
    return actors != null ? actors[id] : null;
  }
);
