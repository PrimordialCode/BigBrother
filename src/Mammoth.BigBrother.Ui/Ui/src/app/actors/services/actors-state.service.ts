import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IActorInfoDto, ICounterDto } from '../../models/endpoint-web-api.models';
import { ActorsDisplayActor, ActorsGetGlobalCounters, ActorsLoadHierarcy } from '../../store/actions';
import { getActorsGlobalCounters, getActorsHierarchy, getSelectedActor } from '../../store/selectors';
import { IAppState } from '../../store/state';
import { ActorDetailService } from './actor-detail.service';

/**
 * A service that will manage all the Actors information for a single endpoint:
 * - it will wraps all the operations for a specifc endpoint
 * - it will expose the actual actors hierarchy state
 *   that can be used by several components.
 * - the actual state of the service is held globally in ngrx/store
 *
 * the service will be injected using a factory function because the constructor
 * requires the endpoint name which can be retrieved at runtime from the url.
 */
@Injectable()
export class ActorsStateService implements OnDestroy {
  private _endpointName: string;

  private _hierarchy$: Observable<IActorInfoDto>;
  public get hierarchy$() {
    return this._hierarchy$;
  }

  private _globalCounters$: Observable<ICounterDto[]>;
  public get globalCounters$() {
    return this._globalCounters$;
  }

  private _selectedActor$: Observable<string>;
  public get selectedActor$() {
    return this._selectedActor$;
  }

  private _intervalSubscription: Subscription;

  constructor(
    private store: Store<IAppState>
  ) {
  }

  ngOnDestroy(): void {
    this.resetIntervalSubscription();
  }

  private resetIntervalSubscription() {
    if (this._intervalSubscription != null) {
      this._intervalSubscription.unsubscribe();
      this._intervalSubscription = null;
    }
  }

  public init(endpointName: string) {
    this.resetIntervalSubscription();

    this._endpointName = endpointName;

    // pass the same argument to have the memoization work!
    const props = { endpointName: this._endpointName };

    this._hierarchy$ = this.store.pipe(
      select(getActorsHierarchy(), props),
      filter(data => data != null),
      map(data => data.hierarchy)
    );

    this._globalCounters$ = this.store.pipe(
      select(getActorsGlobalCounters(), props),
      filter(data => data != null),
      map(data => data.counters)
    );

    this._selectedActor$ = this.store.pipe(
      select(getSelectedActor(), props)
    );

    this.refresh();

    // Saving the state in the local storage there's no need to reset or reload the information
    // again, the snapshot of the last displayed actor will be reloaded again
    // we should instead check if the selected actor still exists in the updated actor system.
    // Actually if the actor does not exists anymore, no data will be returned
    /*
    // if there's a selected actor in the store use that to load the existing data instead of asking for a new one
    this.store.pipe(
      select(getSelectedActor(), props),
      tap(selectedActor => this.displayActor(selectedActor))
    );
    */
    // this.displayActor(null);

    this._intervalSubscription = interval(5000).subscribe(() => this.refresh());
  }

  public refresh() {
    this.store.dispatch(new ActorsGetGlobalCounters(this._endpointName));
    this.store.dispatch(new ActorsLoadHierarcy(this._endpointName));
  }

  public displayActor(id: string) {
    this.store.dispatch(new ActorsDisplayActor(this._endpointName, id));
  }

  public createActorDetailService(id: string): ActorDetailService {
    return new ActorDetailService(
      this._endpointName,
      id,
      this.store
    );
  }
}

export function actorsStateServiceFactory(store: Store<IAppState>): ActorsStateService {
  return new ActorsStateService(store);
}
