import { Injectable } from '@angular/core';
import { EndpointWebApiService, IActorInfoDto } from './endpoint-web-api.service';
import { Observable, BehaviorSubject } from 'rxjs';

/**
 * A service that will hold the actual actors hierarchi state
 * that can be used by several components
 */
@Injectable({
  providedIn: 'root'
})
export class ActorsStateService {

  private _hierarchy$ = new BehaviorSubject<IActorInfoDto>(null);
  public get hierarchy$(): Observable<IActorInfoDto> {
    return this._hierarchy$;
  }

  constructor(
    private endpoint: EndpointWebApiService
  ) { }

  public refresh() {
    this.endpoint.GetActorsHierarchy().then(hierarchy => this._hierarchy$.next(hierarchy));
  }
}
