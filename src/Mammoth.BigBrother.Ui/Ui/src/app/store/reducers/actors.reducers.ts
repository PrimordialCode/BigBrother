import { ActorsActions, ActorsActionsTypes } from "../actions/actors.actions";
import { IActorsStateDictionary, initialActorsState, IActorsState, ActorsState, ActorState, IActorState } from "../state/actors.state";
import { IActorDetailDto } from "../../models/endpoint-web-api.models";

/**
 * returns the current existing state or initialize a new collection of actors endpoint object
 *
 * @param {IActorsStateDictionary} state
 * @param {string} endpointName
 * @returns {IActorsState}
 */
function getEndpoint(state: IActorsStateDictionary, endpointName: string): IActorsState {
  const endpoint = state[endpointName];
  if (endpoint != null) {
    return endpoint;
  }
  return new ActorsState();
}

/**
 * return the currently existing actor state or initialize a new actor's state object
 *
 * @param {ActorsState} endpoint
 * @param {string} id
 * @returns {IActorState}
 */
function getActor(endpoint: ActorsState, id: string): IActorState {
  const actor = endpoint.actors[id];
  if (actor != null) {
    return actor;
  }
  return new ActorState();
}

export function actorsReducer(
  state = initialActorsState,
  action: ActorsActions
): IActorsStateDictionary {
  switch (action.type) {
    case ActorsActionsTypes.ACTORS_LOAD_HIERARCHY: {
      const endpoint = getEndpoint(state, action.endpointName);
      return {
        ...state,
        [action.endpointName]: {
          ...endpoint,
          hierarchy: {
            ...endpoint.hierarchy,
            loading: true,
            loaded: false
          }
        }
      };
    }
    case ActorsActionsTypes.ACTORS_LOAD_HIERARCHY_FAILED: {
      const endpoint = getEndpoint(state, action.endpointName);
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
      const endpoint = getEndpoint(state, action.endpointName);
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
    case ActorsActionsTypes.ACTORS_GET_GLOBAL_COUNTERS: {
      const endpoint = getEndpoint(state, action.endpointName);
      return {
        ...state,
        [action.endpointName]: {
          ...endpoint,
          globalCounters: {
            ...endpoint.globalCounters,
            loading: true,
            loaded: false
          }
        }
      };
    }
    case ActorsActionsTypes.ACTORS_GET_GLOBAL_COUNTERS_FAILED: {
      const endpoint = getEndpoint(state, action.endpointName);
      return {
        ...state,
        [action.endpointName]: {
          ...endpoint,
          globalCounters: {
            ...endpoint.globalCounters,
            loading: false,
            loaded: false
          }
        }
      };
    }
    case ActorsActionsTypes.ACTORS_GET_GLOBAL_COUNTERS_SUCCEDED: {
      const endpoint = getEndpoint(state, action.endpointName);
      return {
        ...state,
        [action.endpointName]: {
          ...endpoint,
          globalCounters: {
            ...endpoint.globalCounters,
            counters: action.payload,
            loading: false,
            loaded: true
          }
        }
      };
    }
    case ActorsActionsTypes.ACTORS_DISPLAY_ACTOR: {
      const endpoint = getEndpoint(state, action.endpointName);
      return {
        ...state,
        [action.endpointName]: {
          ...endpoint,
          selectedActor: action.id
        }
      };
    }
    case ActorsActionsTypes.ACTORS_GET_ACTOR_DETAIL_FAILED: {
      const endpoint = getEndpoint(state, action.endpointName);
      const actor = getActor(endpoint, action.id);
      return {
        ...state,
        [action.endpointName]: {
          ...endpoint,
          actors: {
            ...endpoint.actors,
            [action.id]: {
              ...actor,
              actorDetail: <IActorDetailDto>{}
            }
          }
        }
      };
    }
    case ActorsActionsTypes.ACTORS_GET_ACTOR_DETAIL_SUCCEDED: {
      const endpoint = getEndpoint(state, action.endpointName);
      const actor = getActor(endpoint, action.id);
      return {
        ...state,
        [action.endpointName]: {
          ...endpoint,
          actors: {
            ...endpoint.actors,
            [action.id]: {
              ...actor,
              actorDetail: action.payload
            }
          }
        }
      };
    }
    case ActorsActionsTypes.ACTORS_GET_ACTOR_COUNTERS_FAILED: {
      const endpoint = getEndpoint(state, action.endpointName);
      const actor = getActor(endpoint, action.id);
      return {
        ...state,
        [action.endpointName]: {
          ...endpoint,
          actors: {
            ...endpoint.actors,
            [action.id]: {
              ...actor,
              actorCounters: []
            }
          }
        }
      };
    }
    case ActorsActionsTypes.ACTORS_GET_ACTOR_COUNTERS_SUCCEDED: {
      const endpoint = getEndpoint(state, action.endpointName);
      const actor = getActor(endpoint, action.id);
      return {
        ...state,
        [action.endpointName]: {
          ...endpoint,
          actors: {
            ...endpoint.actors,
            [action.id]: {
              ...actor,
              actorCounters: action.payload
            }
          }
        }
      };
    }
    case ActorsActionsTypes.ACTORS_GET_ACTOR_EVENTS_FAILED: {
      const endpoint = getEndpoint(state, action.endpointName);
      const actor = getActor(endpoint, action.id);
      return {
        ...state,
        [action.endpointName]: {
          ...endpoint,
          actors: {
            ...endpoint.actors,
            [action.id]: {
              ...actor,
              actorEvents: []
            }
          }
        }
      };
    }
    case ActorsActionsTypes.ACTORS_GET_ACTOR_EVENTS_SUCCEDED: {
      const endpoint = getEndpoint(state, action.endpointName);
      const actor = getActor(endpoint, action.id);
      return {
        ...state,
        [action.endpointName]: {
          ...endpoint,
          actors: {
            ...endpoint.actors,
            [action.id]: {
              ...actor,
              actorEvents: action.payload
            }
          }
        }
      };
    }
    case ActorsActionsTypes.ACTORS_GET_ACTOR_EXCEPTIONS_FAILED: {
      const endpoint = getEndpoint(state, action.endpointName);
      const actor = getActor(endpoint, action.id);
      return {
        ...state,
        [action.endpointName]: {
          ...endpoint,
          actors: {
            ...endpoint.actors,
            [action.id]: {
              ...actor,
              actorExceptions: []
            }
          }
        }
      };
    }
    case ActorsActionsTypes.ACTORS_GET_ACTOR_EXCEPTIONS_SUCCEDED: {
      const endpoint = getEndpoint(state, action.endpointName);
      const actor = getActor(endpoint, action.id);
      return {
        ...state,
        [action.endpointName]: {
          ...endpoint,
          actors: {
            ...endpoint.actors,
            [action.id]: {
              ...actor,
              actorExceptions: action.payload
            }
          }
        }
      };
    }
  }

  return state;
}
