
import { Action } from "@ngrx/store";
import { Configuration } from "../../models/configuration.model";

export const CONFIGURATION_LOADED = '[configuration] configuration loaded';

export class ConfigurationLoaded implements Action {
  public readonly type = CONFIGURATION_LOADED;
  constructor(public payload: Configuration) {}
}

export type ConfigurationActions = ConfigurationLoaded;
