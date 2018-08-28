import { Injectable } from "@angular/core";
import { Params, RouterStateSnapshot } from "@angular/router";
import { RouterStateSerializer } from "@ngrx/router-store";
import { IAppState } from "../state";

export interface IRouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export const getRouterState = (state: IAppState) => state.router;

@Injectable()
export class CustomRouterStateSerializer implements RouterStateSerializer<IRouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): IRouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}
