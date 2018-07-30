import { Action } from "@ngrx/store";
import { IActorInfoDto } from "../../services/endpoint-web-api.service";

export const ACTORS_HIERARCHY_LOADED = '[actors] hierarchy loaded';

export class ActorsHierarchyLoaded implements Action {
  public readonly type = ACTORS_HIERARCHY_LOADED;
  constructor(
    public endpointName: string,
    public payload: IActorInfoDto
  ) {}
}

export type ActorsActions = ActorsHierarchyLoaded;
