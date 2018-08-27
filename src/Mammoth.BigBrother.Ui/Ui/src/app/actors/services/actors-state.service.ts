import { OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, share } from 'rxjs/operators';
import { IActorInfoDto, ICounterDto } from '../../models/endpoint-web-api.models';
import { ActorsDisplayActor, ActorsGetGlobalCounters, ActorsLoadHierarcy } from '../../store/actions';
import { getActorsGlobalCounters, getActorsHierarchy } from '../../store/selectors';
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

  private _intervalSubscription: Subscription;

  constructor(
    endpointName: string,
    private store: Store<IAppState>
  ) {
    this._endpointName = endpointName;

    this._hierarchy$ = this.store.select(getActorsHierarchy(this._endpointName)).pipe(
      filter(data => data != null),
      map(data => data.hierarchy),
      share()
    );

    this._globalCounters$ = this.store.select(getActorsGlobalCounters(this._endpointName)).pipe(
      filter(data => data != null),
      map(data => data.counters),
      share()
    );

    this._intervalSubscription = interval(5000).subscribe(() => this.refresh());
  }

  ngOnDestroy(): void {
    if (this._intervalSubscription != null) {
      this._intervalSubscription.unsubscribe();
      this._intervalSubscription = null;
    }
  }

  public refresh() {
    this.store.dispatch(new ActorsGetGlobalCounters(this._endpointName));
    this.store.dispatch(new ActorsLoadHierarcy(this._endpointName));
  }

  public displayActor(id: string) {
    this.store.dispatch(new ActorsDisplayActor(this._endpointName, id));
  }

  public getActorDetailService(id: string): ActorDetailService {
    return new ActorDetailService(
      this._endpointName,
      id,
      this.store
    );
  }
}

export function actorsStateServiceFactory(route: ActivatedRoute, store: Store<IAppState>): ActorsStateService {
  // get the config from the route parameter
  const endpointName = route.snapshot.params["name"] as string;
  return new ActorsStateService(endpointName, store);
}
