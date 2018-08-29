import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { NavigationExtras, Params, Router, RouterStateSnapshot } from "@angular/router";
import { Actions, Effect } from "@ngrx/effects";
import { RouterStateSerializer } from "@ngrx/router-store";
import { Action } from "@ngrx/store";
import { IAppState } from "../state";
import { tap } from "rxjs/operators";

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

export enum RouterActionsTypes {
  GOTO = "[router] goto",
  BACK = "[router] back",
  FORWARD = "[router] forward"
}

export class RouterGoTo implements Action {
  readonly type = RouterActionsTypes.GOTO;
  constructor(
    public path: any[],
    public query?: Params,
    public extras?: NavigationExtras
  ) { }
}

export class RouterBack implements Action {
  readonly type = RouterActionsTypes.BACK;
}

export class RouterFoward implements Action {
  readonly type = RouterActionsTypes.FORWARD;
}

export type RouterActions = RouterGoTo
  | RouterBack
  | RouterFoward;

@Injectable()
export class RouterEffects {

  @Effect({ dispatch: false })
  goto$ = this.actions$.ofType(RouterActionsTypes.GOTO)
    .pipe(
      tap((action: RouterGoTo) => {
        this.router.navigate(action.path, { queryParams: action.query, ...action.extras });
      })
    );

  @Effect({ dispatch: false })
  back$ = this.actions$.ofType(RouterActionsTypes.BACK)
    .pipe(
      tap(() => this.location.back())
    );

  @Effect({ dispatch: false })
  forward$ = this.actions$.ofType(RouterActionsTypes.FORWARD)
    .pipe(
      tap(() => this.location.forward())
    );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) { }
}
