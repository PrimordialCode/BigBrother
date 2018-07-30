import { initialActorsState, IActorsStateDictionary } from "../state/actors.state";
import { ActorsActions, ACTORS_HIERARCHY_LOADED } from "../actions/actors.actions";

export function actorsReducer(
  state = initialActorsState,
  action: ActorsActions
): IActorsStateDictionary {
  switch (action.type) {
    case ACTORS_HIERARCHY_LOADED:
      return {
        ...state,
        [action.endpointName]: {
          hierarchy: action.payload
        }
      };
  }

  return state;
}
