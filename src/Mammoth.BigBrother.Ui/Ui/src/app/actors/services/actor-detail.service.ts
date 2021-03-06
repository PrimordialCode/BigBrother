import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IActorDetailDto, ICounterDto, IMonitoringEventData, IMonitoringExceptionData } from "../../models/endpoint-web-api.models";
import { getActorsActor } from "../../store/selectors";
import { IAppState } from "../../store/state";

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

  private _counters$: Observable<ICounterDto[]>;
  public get counters$() {
    return this._counters$;
  }

  private _events$: Observable<IMonitoringEventData[]>;
  public get events$() {
    return this._events$;
  }

  private _exceptions$: Observable<IMonitoringExceptionData[]>;
  public get exceptions$() {
    return this._exceptions$;
  }

  constructor(
    endpointName: string,
    id: string,
    store: Store<IAppState>
  ) {
    // create a single instance of the props, so memoization works better
    const props = { endpointName: endpointName, actorId: id };

    this._detail$ = store.pipe(
      select(getActorsActor(), props),
      map(data => data && data.actorDetail)
    );

    this._counters$ = store.pipe(
      select(getActorsActor(), props),
      map(data => data && data.actorCounters)
    );

    this._events$ = store.pipe(
      select(getActorsActor(), props),
      map(data => data && data.actorEvents)
    );

    this._exceptions$ = store.pipe(
      select(getActorsActor(), props),
      map(data => data && data.actorExceptions)
    );
  }
}
