import { initialConfigurationState, IConfigurationState } from "../state/configuration.state";
import { ConfigurationActions, CONFIGURATION_LOADED, CONFIGURATION_LOAD_FAILED } from "../actions/configuration.actions";


export function configurationReducer(
  state = initialConfigurationState,
  action: ConfigurationActions
): IConfigurationState {
  switch (action.type) {
    case CONFIGURATION_LOAD_FAILED:
      return {
        ...state,
        configuration: null,
        loading: false,
        loaded: false
      };
    case CONFIGURATION_LOADED:
      return {
        ...state,
        configuration: action.payload,
        loading: false,
        loaded: true
      };
  }

  return state;
}
