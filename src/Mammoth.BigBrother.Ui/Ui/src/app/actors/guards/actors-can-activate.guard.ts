import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { ActorsLoadHierarcy, getActorsHierarchyLoaded, IAppState } from '../../store';

/**
 * A Guard can be used to trigger the loading of data (if not available) before displaying the
 * page, we wait to have some data to display for the hierarchy before rendering the page itself.
 *
 * @export
 * @class ActorsCanActivateGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class ActorsCanActivateGuard implements CanActivate {

  constructor(
    private store: Store<IAppState>
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const endpoint = next.params.name;
    if (endpoint == null || endpoint === "") {
      return false;
    }

    return this.store.pipe(
      select(getActorsHierarchyLoaded(), { endpointName: endpoint }),
      tap(data => {
        if (!data) {
          // ask for new data
          this.store.dispatch(new ActorsLoadHierarcy(endpoint));
        }
      }),
      filter(data => data),
      take(1),
      switchMap(_ => of(true)), // because I want to unsubscribe from the store observable
      catchError(_ => of(false))
    );
  }
}
