import { createSelector } from "@ngrx/store";
import { IActorsStateDictionary, IAppState } from "../state";

export interface IActorsSelectorsProps {
  endpointName: string;
  actorId?: string;
}

export const getActorsStateDictionary = (state: IAppState) => state.actors;

/*
 * NgRx 6.1.0 - We use the new selectors with "props", so we can pass dynamic parameters to the selectors (without using
 * workarounds like described here: https://blog.angularindepth.com/ngrx-parameterized-selector-e3f610529f8)
 *
 * It's better to create factory functions for selectors that use parameters / props,
 * this due to how the memoization and caching works: ngrx/store will keep a cache for each instance of the couple [selector,props]
 * if we change any of this the whole cache will be reset and re-evaluated every time we change any of these values.
 *
 * ngrx holds a cache for each instance of the selector, so if we need multiple instances of these selectors active at the same time
 * (because we call them with different props), it better to have factory functions and create multiple instances of the selectors.
 */

export const getActorsState = () => createSelector(
  getActorsStateDictionary,
  (state: IActorsStateDictionary, props: IActorsSelectorsProps) => state[props.endpointName]
);
export const getActorsHierarchy = () => createSelector(
  getActorsState(),
  state => state != null && state.hierarchy
);
export const getActorsGlobalCounters = () => createSelector(
  getActorsState(),
  state => state != null && state.globalCounters
);
export const getSelectedActor = () => createSelector(
  getActorsState(),
  state => state != null && state.selectedActor
);
export const getActorsActor = () => createSelector(
  getActorsState(),
  (state, props) => {
    const actors = state != null && state.actors;
    return actors != null ? actors[props.actorId] : null;
  }
);
