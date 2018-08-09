import { ActorsActions, ActorsActionsTypes } from "../actions/actors.actions";
import { IActorsStateDictionary, initialActorsState } from "../state/actors.state";

export function actorsReducer(
  state = initialActorsState,
  action: ActorsActions
): IActorsStateDictionary {
  switch (action.type) {
    case ActorsActionsTypes.ACTORS_LOAD_HIERARCHY:
      return {
        ...state,
        [action.endpointName]: {
          ...state[action.endpointName],
          loading: true,
          loaded: false
        }
      };
    case ActorsActionsTypes.ACTORS_LOAD_HIERARCHY_FAILED:
      return {
        ...state,
        [action.endpointName]: {
          ...state[action.endpointName],
          loading: false,
          loaded: false
        }
      };
    case ActorsActionsTypes.ACTORS_HIERARCHY_LOADED:
      return {
        ...state,
        [action.endpointName]: {
          ...state[action.endpointName],
          hierarchy: action.payload,
          loading: false,
          loaded: true
        }
      };
  }

  return state;
}
