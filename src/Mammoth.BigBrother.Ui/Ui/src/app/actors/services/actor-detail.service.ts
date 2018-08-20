import { Store } from "@ngrx/store";
import { IAppState } from "../../store/state/app.state";
import { Observable } from "rxjs";
import { IActorDetailDto } from "../../models/endpoint-web-api.models";
import { getActorsState } from "../../store/reducers";
import { filter, map, share } from "rxjs/operators";

/**
 * a convenience class used to wrap the access to the common state object
 * exposing observables used by components.
 *
 * actors information are already partitioned by endpoint name
 */
export class ActorDetailService {

  private _detail$: Observable<IActorDetailDto>;
  public get detail$() {
    return this._detail$;
  }

  constructor(
    endpointName: string,
    id: string,
    store: Store<IAppState>
  ) {
    this._detail$ = store.select(getActorsState(endpointName)).pipe(
      filter(data => data != null),
      map(data => data.actors[id]),
      map(data => data.actorDetail),
      share()
    );
  }
}
