import { Action } from "@ngrx/store";
import { IActorInfoDto } from "../../models/endpoint-web-api.models";

export const ACTORS_LOAD_HIERARCHY = "[actors] load hierarchy";
export const ACTORS_LOAD_HIERARCHY_FAILED = "[actors] load hierarchy failed";
export const ACTORS_HIERARCHY_LOADED = '[actors] hierarchy loaded';

abstract class ActorsAction implements Action {
  public abstract readonly type: string;
  constructor(
    public endpointName: string
  ) { }
}

export class ActorsLoadHierarcy extends ActorsAction {
  public readonly type = ACTORS_LOAD_HIERARCHY;
  constructor(
    endpointName: string
  ) { super(endpointName); }
}

export class ActorsLoadHierarcyFailed extends ActorsAction {
  public readonly type = ACTORS_LOAD_HIERARCHY_FAILED;
  constructor(
    endpointName: string,
    public payload: any
  ) { super(endpointName); }
}

export class ActorsHierarchyLoaded extends ActorsAction {
  public readonly type = ACTORS_HIERARCHY_LOADED;
  constructor(
    endpointName: string,
    public payload: IActorInfoDto
  ) { super(endpointName); }
}

export type ActorsActions = ActorsLoadHierarcy | ActorsLoadHierarcyFailed | ActorsHierarchyLoaded;
