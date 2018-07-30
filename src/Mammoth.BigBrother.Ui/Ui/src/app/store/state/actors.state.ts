import { IActorInfoDto } from "../../services/endpoint-web-api.service";

export interface IActorsState {
  hierarchy: IActorInfoDto;
}

export interface IActorsStateDictionary {
  [index: string]: IActorsState;
}

export const initialActorsState: IActorsStateDictionary = {};
