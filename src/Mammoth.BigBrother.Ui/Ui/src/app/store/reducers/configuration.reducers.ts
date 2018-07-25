import { initialConfigurationState, IConfigurationState } from "../state/configuration.state";
import { ConfigurationActions, CONFIGURATION_LOADED } from "../actions/configuration.actions";


export function configurationReducer(
  state = initialConfigurationState,
  action: ConfigurationActions
): IConfigurationState {
  switch (action.type) {
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
