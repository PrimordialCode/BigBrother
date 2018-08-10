import { OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { interval, Observable, Subscription } from 'rxjs';
import { map, skipWhile, filter, share } from 'rxjs/operators';
import { IActorInfoDto } from '../../models/endpoint-web-api.models';
import { ActorsLoadHierarcy } from '../../store/actions';
import { getActorsStateDictionary } from '../../store/reducers';
import { IAppState } from '../../store/state/app.state';

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

  private _intervalSubscription: Subscription;

  constructor(
    endpointName: string,
    private store: Store<IAppState>
  ) {
    this._endpointName = endpointName;
    this.store.select(getActorsStateDictionary).pipe(
      map(data => {
        const h = data[this._endpointName].hierarchy;
        if (h != null) {
          return h.hierarchy;
        }
        return null;
      }),
      filter(data => data != null),
      share()
    );

    this._hierarchy$ = this.store.select(getActorsStateDictionary).pipe(
      map(data => {
        const h = data[this._endpointName].hierarchy;
        if (h != null) {
          return h.hierarchy;
        }
        return null;
      })
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
    this.store.dispatch(new ActorsLoadHierarcy(this._endpointName));
  }
}

export function actorsStateServiceFactory(route: ActivatedRoute, store: Store<IAppState>): ActorsStateService {
  // get the config from the route parameter
  const endpointName = route.snapshot.params["name"] as string;
  return new ActorsStateService(endpointName, store);
}
