import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { SingletonEndpointWebApiService } from "../../services/singleton-endpoint-web-api.service";
import { ActorsActionsTypes, ActorsDisplayActor, ActorsGetActorCounters, ActorsGetActorCountersFailed, ActorsGetActorCountersSucceded, ActorsGetActorDetail, ActorsGetActorDetailFailed, ActorsGetActorDetailSucceded, ActorsGetActorEvents, ActorsGetActorEventsFailed, ActorsGetActorEventsSucceded, ActorsGetActorExceptions, ActorsGetActorExceptionsFailed, ActorsGetActorExceptionsSucceded, ActorsGetGlobalCounters, ActorsGetGlobalCountersFailed, ActorsGetGlobalCountersSucceded, ActorsHierarchyLoaded, ActorsLoadHierarcy, ActorsLoadHierarcyFailed } from "../actions";

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
      switchMap((action: ActorsDisplayActor) => action.id != null ? [
        new ActorsGetActorDetail(action.endpointName, action.id),
        new ActorsGetActorCounters(action.endpointName, action.id),
        new ActorsGetActorEvents(action.endpointName, action.id),
        new ActorsGetActorExceptions(action.endpointName, action.id)
      ] : [])
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

  @Effect()
  getActorCounters$ = this.actions$.ofType(ActorsActionsTypes.ACTORS_GET_ACTOR_COUNTERS)
    .pipe(
      switchMap((action: ActorsGetActorDetail) => {
        return this.endpointService.GetActorCounters(action.endpointName, { path: action.id }).pipe(
          map(detail => new ActorsGetActorCountersSucceded(action.endpointName, action.id, detail)),
          catchError(error => of(new ActorsGetActorCountersFailed(action.endpointName, action.id, error)))
        );
      })
    );

  @Effect()
  getActorEvents$ = this.actions$.ofType(ActorsActionsTypes.ACTORS_GET_ACTOR_EVENTS)
    .pipe(
      switchMap((action: ActorsGetActorDetail) => {
        return this.endpointService.GetActorEvents(action.endpointName, { path: action.id }).pipe(
          map(detail => new ActorsGetActorEventsSucceded(action.endpointName, action.id, detail)),
          catchError(error => of(new ActorsGetActorEventsFailed(action.endpointName, action.id, error)))
        );
      })
    );

  @Effect()
  getActorExceptions$ = this.actions$.ofType(ActorsActionsTypes.ACTORS_GET_ACTOR_EXCEPTIONS)
    .pipe(
      switchMap((action: ActorsGetActorDetail) => {
        return this.endpointService.GetActorExceptions(action.endpointName, { path: action.id }).pipe(
          map(detail => new ActorsGetActorExceptionsSucceded(action.endpointName, action.id, detail)),
          catchError(error => of(new ActorsGetActorExceptionsFailed(action.endpointName, action.id, error)))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private endpointService: SingletonEndpointWebApiService
  ) {
  }
}
