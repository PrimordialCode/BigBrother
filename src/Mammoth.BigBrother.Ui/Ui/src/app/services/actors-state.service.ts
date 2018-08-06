import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActorsHierarchyLoaded } from '../store/actions/actors.actions';
import { getActorsStateDictionary } from '../store/reducers';
import { IAppState } from '../store/state/app.state';
import { EndpointWebApiService, IActorInfoDto } from './endpoint-web-api.service';

/**
 * A service that will manage a single endpoint:
 * - it will wrap all the data for a specifc endpoint
 * - it will expose the actual actors hierarchy state
 *   that can be used by several components.
 */
@Injectable()
export class ActorsStateService implements OnDestroy {
  private _endpointName: string;

  private _hierarchy$ = new BehaviorSubject<IActorInfoDto>(null);
  public get hierarchy$(): Observable<IActorInfoDto> {
    return this._hierarchy$;
  }

  private _hierarchyStore$: Observable<IActorInfoDto>;
  public get hierarchyStore$() {
    return this._hierarchyStore$;
  }

  private _intervalSubscription: Subscription;

  constructor(
    private endpoint: EndpointWebApiService,
    private store: Store<IAppState>
  ) {
    this._endpointName = endpoint.name;
    this._hierarchyStore$ = this.store.select(getActorsStateDictionary).pipe(
      map(data => {
        const h = data[this._endpointName];
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
    this.endpoint.GetActorsHierarchy().then(hierarchy => {
      this.store.dispatch(new ActorsHierarchyLoaded(this._endpointName, hierarchy));
      this._hierarchy$.next(hierarchy);
    });
  }
}
