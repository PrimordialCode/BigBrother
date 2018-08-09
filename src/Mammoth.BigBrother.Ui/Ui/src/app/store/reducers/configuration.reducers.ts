import { ConfigurationActions, ConfigurationActionsTypes } from "../actions/configuration.actions";
import { IConfigurationState, initialConfigurationState } from "../state/configuration.state";


export function configurationReducer(
  state = initialConfigurationState,
  action: ConfigurationActions
): IConfigurationState {
  switch (action.type) {
    case ConfigurationActionsTypes.CONFIGURATION_LOAD_FAILED:
      return {
        ...state,
        configuration: null,
        loading: false,
        loaded: false
      };
    case ConfigurationActionsTypes.CONFIGURATION_LOADED:
      return {
        ...state,
        configuration: action.payload,
        loading: false,
        loaded: true
      };
  }

  return state;
}
