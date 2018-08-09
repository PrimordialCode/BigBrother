import { ActorsActions, ActorsActionsTypes } from "../actions/actors.actions";
import { IActorsStateDictionary, initialActorsState } from "../state/actors.state";

export function actorsReducer(
  state = initialActorsState,
  action: ActorsActions
): IActorsStateDictionary {
  switch (action.type) {
    case ActorsActionsTypes.ACTORS_LOAD_HIERARCHY: {
      const endpoint = state[action.endpointName];
      return {
        ...state,
        [action.endpointName]: {
          ...endpoint,
          hierarchy: {
            ...(endpoint != null ? endpoint.hierarchy : null),
            loading: true,
            loaded: false
          }
        }
      };
    }
    case ActorsActionsTypes.ACTORS_LOAD_HIERARCHY_FAILED: {
      const endpoint = state[action.endpointName];
      return {
        ...state,
        [action.endpointName]: {
          ...endpoint,
          hierarchy: {
            ...endpoint.hierarchy,
            loading: false,
            loaded: false
          }
        }
      };
    }
    case ActorsActionsTypes.ACTORS_HIERARCHY_LOADED: {
      const endpoint = state[action.endpointName];
      return {
        ...state,
        [action.endpointName]: {
          ...endpoint,
          hierarchy: {
            ...endpoint.hierarchy,
            hierarchy: action.payload,
            loading: false,
            loaded: true
          }
        }
      };
    }
  }

  return state;
}
