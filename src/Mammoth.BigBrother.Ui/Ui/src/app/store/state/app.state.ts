import { IConfigurationState, initialConfigurationState } from "./configuration.state";

export interface IAppState {
  configuration: IConfigurationState;
}

export const initialAppState: IAppState = {
  configuration: initialConfigurationState
};
