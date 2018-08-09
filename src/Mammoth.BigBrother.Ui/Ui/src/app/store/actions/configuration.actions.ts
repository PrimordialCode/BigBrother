
import { Action } from "@ngrx/store";
import { Configuration } from "../../models/configuration.model";

export enum ConfigurationActionsTypes {
  CONFIGURATION_LOAD_FAILED = "[configuration] configuration load failed",
  CONFIGURATION_LOADED = '[configuration] configuration loaded'
}

export class ConfigurationLoadFailed implements Action {
  public readonly type = ConfigurationActionsTypes.CONFIGURATION_LOAD_FAILED;
  constructor(public payload: any) { }
}

export class ConfigurationLoaded implements Action {
  public readonly type = ConfigurationActionsTypes.CONFIGURATION_LOADED;
  constructor(public payload: Configuration) { }
}

export type ConfigurationActions = ConfigurationLoadFailed | ConfigurationLoaded;
