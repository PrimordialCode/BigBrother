import { Action } from "@ngrx/store";
import { IActorInfoDto, ICounterDto, IActorDetailDto, IMonitoringEventData, IMonitoringExceptionData } from "../../models/endpoint-web-api.models";

export enum ActorsActionsTypes {
  ACTORS_GET_GLOBAL_COUNTERS = "[actors] get global counters",
  ACTORS_GET_GLOBAL_COUNTERS_FAILED = "[actors] get global counters failed",
  ACTORS_GET_GLOBAL_COUNTERS_SUCCEDED = "[actors] get global counters succeded",
  ACTORS_LOAD_HIERARCHY = "[actors] load hierarchy",
  ACTORS_LOAD_HIERARCHY_FAILED = "[actors] load hierarchy failed",
  ACTORS_HIERARCHY_LOADED = '[actors] hierarchy loaded',
  ACTORS_DISPLAY_ACTOR = "[actors] display actor",
  ACTORS_GET_ACTOR_DETAIL = "[actors] get actor detail",
  ACTORS_GET_ACTOR_DETAIL_FAILED = "[actors] get actor detail failed",
  ACTORS_GET_ACTOR_DETAIL_SUCCEDED = "[actors] get actor detail succeded",
  ACTORS_GET_ACTOR_COUNTERS = "[actors] get actor counters",
  ACTORS_GET_ACTOR_COUNTERS_FAILED = "[actors] get actor counters failed",
  ACTORS_GET_ACTOR_COUNTERS_SUCCEDED = "[actors] get actor counters succeded",
  ACTORS_GET_ACTOR_EVENTS = "[actors] get actor events",
  ACTORS_GET_ACTOR_EVENTS_FAILED = "[actors] get actor events failed",
  ACTORS_GET_ACTOR_EVENTS_SUCCEDED = "[actors] get actor events succeded",
  ACTORS_GET_ACTOR_EXCEPTIONS = "[actors] get actor exceptions",
  ACTORS_GET_ACTOR_EXCEPTIONS_FAILED = "[actors] get actor exceptions failed",
  ACTORS_GET_ACTOR_EXCEPTIONS_SUCCEDED = "[actors] get actor exceptions succeded",
}

abstract class ActorsAction implements Action {
  public abstract readonly type: string;
  constructor(
    public endpointName: string
  ) { }
}

export class ActorsLoadHierarcy extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_LOAD_HIERARCHY;
  constructor(
    endpointName: string
  ) { super(endpointName); }
}

export class ActorsLoadHierarcyFailed extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_LOAD_HIERARCHY_FAILED;
  constructor(
    endpointName: string,
    public payload: any
  ) { super(endpointName); }
}

export class ActorsHierarchyLoaded extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_HIERARCHY_LOADED;
  constructor(
    endpointName: string,
    public payload: IActorInfoDto
  ) { super(endpointName); }
}

export class ActorsGetGlobalCounters extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_GET_GLOBAL_COUNTERS;
  constructor(
    endpointName: string
  ) { super(endpointName); }
}

export class ActorsGetGlobalCountersFailed extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_GET_GLOBAL_COUNTERS_FAILED;
  constructor(
    endpointName: string,
    public payload: any
  ) { super(endpointName); }
}

export class ActorsGetGlobalCountersSucceded extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_GET_GLOBAL_COUNTERS_SUCCEDED;
  constructor(
    endpointName: string,
    public payload: ICounterDto[]
  ) { super(endpointName); }
}

export class ActorsDisplayActor extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_DISPLAY_ACTOR;
  constructor(
    endpointName: string,
    public id: string
  ) { super(endpointName); }
}

export class ActorsGetActorDetail extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_GET_ACTOR_DETAIL;
  constructor(
    endpointName: string,
    public id: string
  ) { super(endpointName); }
}

export class ActorsGetActorDetailFailed extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_GET_ACTOR_DETAIL_FAILED;
  constructor(
    endpointName: string,
    public id: string,
    public payload: any
  ) { super(endpointName); }
}

export class ActorsGetActorDetailSucceded extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_GET_ACTOR_DETAIL_SUCCEDED;
  constructor(
    endpointName: string,
    public id: string,
    public payload: IActorDetailDto
  ) { super(endpointName); }
}

export class ActorsGetActorCounters extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_GET_ACTOR_COUNTERS;
  constructor(
    endpointName: string,
    public id: string
  ) { super(endpointName); }
}

export class ActorsGetActorCountersFailed extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_GET_ACTOR_COUNTERS_FAILED;
  constructor(
    endpointName: string,
    public id: string,
    public payload: any
  ) { super(endpointName); }
}

export class ActorsGetActorCountersSucceded extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_GET_ACTOR_COUNTERS_SUCCEDED;
  constructor(
    endpointName: string,
    public id: string,
    public payload: ICounterDto[]
  ) { super(endpointName); }
}

export class ActorsGetActorEvents extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_GET_ACTOR_EVENTS;
  constructor(
    endpointName: string,
    public id: string
  ) { super(endpointName); }
}

export class ActorsGetActorEventsFailed extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_GET_ACTOR_EVENTS_FAILED;
  constructor(
    endpointName: string,
    public id: string,
    public payload: any
  ) { super(endpointName); }
}

export class ActorsGetActorEventsSucceded extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_GET_ACTOR_EVENTS_SUCCEDED;
  constructor(
    endpointName: string,
    public id: string,
    public payload: IMonitoringEventData[]
  ) { super(endpointName); }
}

export class ActorsGetActorExceptions extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_GET_ACTOR_EXCEPTIONS;
  constructor(
    endpointName: string,
    public id: string
  ) { super(endpointName); }
}

export class ActorsGetActorExceptionsFailed extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_GET_ACTOR_EXCEPTIONS_FAILED;
  constructor(
    endpointName: string,
    public id: string,
    public payload: any
  ) { super(endpointName); }
}

export class ActorsGetActorExceptionsSucceded extends ActorsAction {
  public readonly type = ActorsActionsTypes.ACTORS_GET_ACTOR_EXCEPTIONS_SUCCEDED;
  constructor(
    endpointName: string,
    public id: string,
    public payload: IMonitoringExceptionData[]
  ) { super(endpointName); }
}

export type ActorsActions =
  ActorsLoadHierarcy
  | ActorsLoadHierarcyFailed
  | ActorsHierarchyLoaded
  | ActorsGetGlobalCounters
  | ActorsGetGlobalCountersFailed
  | ActorsGetGlobalCountersSucceded
  | ActorsDisplayActor
  | ActorsGetActorDetail
  | ActorsGetActorDetailFailed
  | ActorsGetActorDetailSucceded
  | ActorsGetActorCounters
  | ActorsGetActorCountersFailed
  | ActorsGetActorCountersSucceded
  | ActorsGetActorEvents
  | ActorsGetActorEventsFailed
  | ActorsGetActorEventsSucceded
  | ActorsGetActorExceptions
  | ActorsGetActorExceptionsFailed
  | ActorsGetActorExceptionsSucceded;
