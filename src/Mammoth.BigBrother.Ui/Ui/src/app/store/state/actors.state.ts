import { IActorInfoDto } from "../../models/endpoint-web-api.models";

export interface IActorsState {
  hierarchy: IActorInfoDto;
  loading: boolean;
  loaded: boolean;
}

/**
 * multiple endpoints will have their private portion of the state isolated from
 * each other
 *
 * @export
 * @interface IActorsStateDictionary
 */
export interface IActorsStateDictionary {
  [index: string]: IActorsState;
}

/**
 * the initial state of the application
 */
export const initialActorsState: IActorsStateDictionary = {};
