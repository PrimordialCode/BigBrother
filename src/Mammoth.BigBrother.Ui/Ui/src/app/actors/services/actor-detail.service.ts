import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IActorDetailDto } from "../../models/endpoint-web-api.models";
import { getActorsActor } from "../../store/reducers";
import { IAppState } from "../../store/state/app.state";

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
    this._detail$ = store.select(getActorsActor(endpointName, id)).pipe(
      map(data => data != null ? data.actorDetail : null)
    );
  }
}
