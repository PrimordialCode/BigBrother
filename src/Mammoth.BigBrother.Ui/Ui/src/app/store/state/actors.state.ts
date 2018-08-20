import { IActorInfoDto, ICounterDto, IActorDetailDto, IMonitoringEventData, IMonitoringExceptionData } from "../../models/endpoint-web-api.models";

export interface IActorsHierarchyState {
  hierarchy: IActorInfoDto;
  loading: boolean;
  loaded: boolean;
}

export interface IActorsGlobalCountersState {
  counters: ICounterDto[];
  loading: boolean;
  loaded: boolean;
}

export interface IActorState {
  actorDetail: IActorDetailDto;
  actorCounters: ICounterDto[];
  actorEvents: IMonitoringEventData[];
  actorExceptions: IMonitoringExceptionData[];
}

/**
 * the state of a single endpoint when it comes to display Actor System information
 */
export interface IActorsState {
  hierarchy: IActorsHierarchyState;
  globalCounters: IActorsGlobalCountersState;
  selectedActor: IActorState;
  actors: { [index: string]: IActorState };
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
