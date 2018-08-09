import { IActorInfoDto } from "../../models/endpoint-web-api.models";

export interface IActorsHierarchyState {
  hierarchy: IActorInfoDto;
  loading: boolean;
  loaded: boolean;
}

export interface IActorsState {
  hierarchy: IActorsHierarchyState;
}

/**
 * multiple endpoints will have their private portion of the state isolated from
 * each other.
 *
 * Data structures should be normalised in an application that follows the redux pattern
 *
 * @export
 * @interface IActorsStateDictionary
 */
export interface IActorsStateDictionary {
  // the key is the "endpoint name"
  [index: string]: IActorsState;
}

/**
 * the initial state of the application
 */
export const initialActorsState: IActorsStateDictionary = {};
