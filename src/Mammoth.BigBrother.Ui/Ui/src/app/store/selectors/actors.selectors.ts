import { createSelector } from "@ngrx/store";
import { IActorsStateDictionary, IAppState } from "../state";

export interface IActorsSelectorsProps {
  endpointName: string;
  actorId?: string;
}

export const getActorsStateDictionary = (state: IAppState) => state.actors;
export const getActorsState = createSelector(
  getActorsStateDictionary,
  (state: IActorsStateDictionary, props: IActorsSelectorsProps) => state[props.endpointName]
);
export const getActorsHierarchy = createSelector(
  getActorsState,
  state => state != null && state.hierarchy
);
export const getActorsGlobalCounters = createSelector(
  getActorsState,
  state => state != null && state.globalCounters
);
export const getSelectedActor = createSelector(
  getActorsState,
  state => state != null && state.selectedActor
);
export const getActorsActor = createSelector(
  getActorsState,
  (state, props) => {
    const actors = state != null && state.actors;
    return actors != null ? actors[props.actorId] : null;
  }
);
