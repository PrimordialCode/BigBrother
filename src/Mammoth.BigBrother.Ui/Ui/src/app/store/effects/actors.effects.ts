import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { SingletonEndpointWebApiService } from "../../services/singleton-endpoint-web-api.service";
import { ActorsActions, ActorsActionsTypes, ActorsGetActorCounters, ActorsGetActorCountersFailed, ActorsGetActorCountersSucceded, ActorsGetActorDetail, ActorsGetActorDetailFailed, ActorsGetActorDetailSucceded, ActorsGetActorEvents, ActorsGetActorEventsFailed, ActorsGetActorEventsSucceded, ActorsGetActorExceptions, ActorsGetActorExceptionsFailed, ActorsGetActorExceptionsSucceded, ActorsGetGlobalCountersFailed, ActorsGetGlobalCountersSucceded, ActorsHierarchyLoaded, ActorsLoadHierarcyFailed } from "../actions";

@Injectable()
export class ActorsEffects {

  loadHierarchy$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActorsActionsTypes.ACTORS_LOAD_HIERARCHY),
      switchMap(action => {
        return this.endpointService.GetActorsHierarchy(action.endpointName).pipe(
          map(hierarchy => new ActorsHierarchyLoaded(action.endpointName, hierarchy)),
          catchError(error => of(new ActorsLoadHierarcyFailed(action.endpointName, error)))
        );
      })
    ));

  getGlobalCounters$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActorsActionsTypes.ACTORS_GET_GLOBAL_COUNTERS),
      switchMap(action => {
        return this.endpointService.GetGlobalCounters(action.endpointName).pipe(
          map(counters => new ActorsGetGlobalCountersSucceded(action.endpointName, counters)),
          catchError(error => of(new ActorsGetGlobalCountersFailed(action.endpointName, error)))
        );
      })
    ));

  displayActor$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActorsActionsTypes.ACTORS_DISPLAY_ACTOR),
      switchMap(action => action.id != null ? [
        new ActorsGetActorDetail(action.endpointName, action.id),
        new ActorsGetActorCounters(action.endpointName, action.id),
        new ActorsGetActorEvents(action.endpointName, action.id),
        new ActorsGetActorExceptions(action.endpointName, action.id)
      ] : [])
    ));

  getActorDetail$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActorsActionsTypes.ACTORS_GET_ACTOR_DETAIL),
      switchMap(action => {
        return this.endpointService.GetActorDetail(action.endpointName, { path: action.id }).pipe(
          map(detail => new ActorsGetActorDetailSucceded(action.endpointName, action.id, detail)),
          catchError(error => of(new ActorsGetActorDetailFailed(action.endpointName, action.id, error)))
        );
      })
    ));

  getActorCounters$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActorsActionsTypes.ACTORS_GET_ACTOR_COUNTERS),
      switchMap(action => {
        return this.endpointService.GetActorCounters(action.endpointName, { path: action.id }).pipe(
          map(detail => new ActorsGetActorCountersSucceded(action.endpointName, action.id, detail)),
          catchError(error => of(new ActorsGetActorCountersFailed(action.endpointName, action.id, error)))
        );
      })
    ));

  getActorEvents$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActorsActionsTypes.ACTORS_GET_ACTOR_EVENTS),
      switchMap(action => {
        return this.endpointService.GetActorEvents(action.endpointName, { path: action.id }).pipe(
          map(detail => new ActorsGetActorEventsSucceded(action.endpointName, action.id, detail)),
          catchError(error => of(new ActorsGetActorEventsFailed(action.endpointName, action.id, error)))
        );
      })
    ));

  getActorExceptions$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActorsActionsTypes.ACTORS_GET_ACTOR_EXCEPTIONS),
      switchMap(action => {
        return this.endpointService.GetActorExceptions(action.endpointName, { path: action.id }).pipe(
          map(detail => new ActorsGetActorExceptionsSucceded(action.endpointName, action.id, detail)),
          catchError(error => of(new ActorsGetActorExceptionsFailed(action.endpointName, action.id, error)))
        );
      })
    ));

  constructor(
    private actions$: Actions<ActorsActions>,
    private endpointService: SingletonEndpointWebApiService
  ) {
  }
}
