import { initialActorsState, IActorsStateDictionary } from "../state/actors.state";
import { ActorsActions, ACTORS_HIERARCHY_LOADED, ACTORS_LOAD_HIERARCHY, ACTORS_LOAD_HIERARCHY_FAILED } from "../actions/actors.actions";

export function actorsReducer(
  state = initialActorsState,
  action: ActorsActions
): IActorsStateDictionary {
  switch (action.type) {
    case ACTORS_LOAD_HIERARCHY:
      return {
        ...state,
        [action.endpointName]: {
          ...state[action.endpointName],
          loading: true
        }
      };
    case ACTORS_LOAD_HIERARCHY_FAILED:
      return {
        ...state,
        [action.endpointName]: {
          ...state[action.endpointName],
          loading: false,
          loaded: false
        }
      };
    case ACTORS_HIERARCHY_LOADED:
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
