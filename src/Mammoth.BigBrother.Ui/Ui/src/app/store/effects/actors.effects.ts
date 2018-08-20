import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { SingletonEndpointWebApiService } from "../../services/singleton-endpoint-web-api.service";
import { ActorsActionsTypes, ActorsDisplayActor, ActorsGetActorDetail, ActorsGetGlobalCounters, ActorsGetGlobalCountersFailed, ActorsGetGlobalCountersSucceded, ActorsHierarchyLoaded, ActorsLoadHierarcy, ActorsLoadHierarcyFailed, ActorsGetActorDetailSucceded, ActorsGetActorDetailFailed } from "../actions";

@Injectable()
export class ActorsEffects {

  @Effect()
  loadHierarchy$ = this.actions$.ofType(ActorsActionsTypes.ACTORS_LOAD_HIERARCHY)
    .pipe(
      switchMap((action: ActorsLoadHierarcy) => {
        return this.endpointService.GetActorsHierarchy(action.endpointName).pipe(
          map(hierarchy => new ActorsHierarchyLoaded(action.endpointName, hierarchy)),
          catchError(error => of(new ActorsLoadHierarcyFailed(action.endpointName, error)))
        );
      })
    );

  @Effect()
  getGlobalCounters$ = this.actions$.ofType(ActorsActionsTypes.ACTORS_GET_GLOBAL_COUNTERS)
    .pipe(
      switchMap((action: ActorsGetGlobalCounters) => {
        return this.endpointService.GetGlobalCounters(action.endpointName).pipe(
          map(counters => new ActorsGetGlobalCountersSucceded(action.endpointName, counters)),
          catchError(error => of(new ActorsGetGlobalCountersFailed(action.endpointName, error)))
        );
      })
    );

  @Effect()
  displayActor$ = this.actions$.ofType(ActorsActionsTypes.ACTORS_DISPLAY_ACTOR)
    .pipe(
      switchMap((action: ActorsDisplayActor) => [
        new ActorsGetActorDetail(action.endpointName, action.id)
      ])
    );

  @Effect()
  getActorDetail$ = this.actions$.ofType(ActorsActionsTypes.ACTORS_GET_ACTOR_DETAIL)
    .pipe(
      switchMap((action: ActorsGetActorDetail) => {
        return this.endpointService.GetActorDetail(action.endpointName, { path: action.id }).pipe(
          map(detail => new ActorsGetActorDetailSucceded(action.endpointName, action.id, detail)),
          catchError(error => of(new ActorsGetActorDetailFailed(action.endpointName, action.id, error)))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private endpointService: SingletonEndpointWebApiService
  ) {
  }
}
