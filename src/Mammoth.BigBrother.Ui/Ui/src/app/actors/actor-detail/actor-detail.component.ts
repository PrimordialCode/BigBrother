import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IActorDetailDto, ICounterDto, IMonitoringEventData, IMonitoringExceptionData } from '../../models/endpoint-web-api.models';
import { ActorDetailService } from '../services/actor-detail.service';
import { ActorsStateService } from '../services/actors-state.service';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActorDetailComponent implements OnInit, OnChanges {
  // the Id of the actor to display inside this component
  @Input() actor: string;

  public actorDetail$: Observable<IActorDetailDto>;
  public actorCounters$: Observable<ICounterDto[]>;
  public actorEvents$: Observable<IMonitoringEventData[]>;
  public actorExceptions$: Observable<IMonitoringExceptionData[]>;

  private actorDetailService: ActorDetailService;

  constructor(
    // private endpoint: EndpointWebApiService,
    private actorsStateService: ActorsStateService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.actor != null) {
      if (changes.actor.currentValue != null) {
        // no need to get the data here, we've already sent a message to the store
        // this.refresh();

        this.actorDetailService = this.actorsStateService.getActorDetailService(this.actor);
        this.actorDetail$ = this.actorDetailService.detail$;
        this.actorCounters$ = this.actorDetailService.counters$;
        this.actorEvents$ = this.actorDetailService.events$;
        this.actorExceptions$ = this.actorDetailService.exceptions$;
      } else {
        this.actorDetailService = null;
        this.actorDetail$ = null;
        this.actorCounters$ = null;
        this.actorEvents$ = null;
        this.actorExceptions$ = null;
      }
    }
  }

  public refresh() {
    if (this.actor == null) {
      return;
    }

    this.actorsStateService.displayActor(this.actor);

    // the "old-way" of doing things: call a service and mutate the local state
    /*
    const actorPath = this.actor;
    const requestArgs = { path: actorPath };
    this.actorDetail$ = this.endpoint.GetActorDetail(requestArgs);
    this.actorCounters$ = this.endpoint.GetActorCounters(requestArgs);
    this.actorEvents$ = this.endpoint.GetActorEvents(requestArgs);
    this.actorExceptions$ = this.endpoint.GetActorExceptions(requestArgs);
    */
  }

}
