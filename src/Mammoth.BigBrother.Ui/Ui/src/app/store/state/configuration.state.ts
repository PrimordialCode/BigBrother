import { Configuration } from "../../models/configuration.model";

export interface IConfigurationState {
  configuration: Configuration;
  loading: boolean;
  loaded: boolean;
}

export const initialConfigurationState: IConfigurationState = {
  configuration: null,
  loading: true,
  loaded: false
};
