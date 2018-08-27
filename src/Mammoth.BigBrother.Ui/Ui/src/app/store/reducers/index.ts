import { routerReducer } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../state";
import { actorsReducer } from "./actors.reducers";
import { configurationReducer } from "./configuration.reducers";

export const reducers: ActionReducerMap<IAppState> = {
  configuration: configurationReducer,
  actors: actorsReducer,
  router: routerReducer,
};

export * from "./actors.reducers";
export * from "./configuration.reducers";

