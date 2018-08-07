import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { EndpointWebApiService } from "../../services/endpoint-web-api.service";
import { ActorsHierarchyLoaded, ActorsLoadHierarcy, ActorsLoadHierarcyFailed, ACTORS_LOAD_HIERARCHY } from "../actions";

@Injectable()
export class ActorsEffects {
  constructor(
    private actions$: Actions,
    private endpoint: EndpointWebApiService
  ) { }

  @Effect()
  loadHierarchy$ = this.actions$.ofType(ACTORS_LOAD_HIERARCHY)
    .pipe(
      switchMap((action: ActorsLoadHierarcy) => {
        return this.endpoint.GetActorsHierarchy().pipe(
          map(hierarchy => new ActorsHierarchyLoaded(action.endpointName, hierarchy)),
          catchError(error => of(new ActorsLoadHierarcyFailed(action.endpointName, error)))
        );
      })
    );
}
