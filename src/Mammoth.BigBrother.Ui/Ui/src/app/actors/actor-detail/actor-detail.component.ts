import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IActorDetailDto, ICounterDto, IMonitoringEventData, IMonitoringExceptionData } from '../../models/endpoint-web-api.models';
import { ActorGraphNode } from '../actors-graph/actprs-graph.models';
import { ActorDetailService } from '../services/actor-detail.service';
import { ActorsStateService } from '../services/actors-state.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush // cannot use this right now, all the bindings must be to observables
})
export class ActorDetailComponent implements OnInit, OnChanges {
  @Input() actor: ActorGraphNode;

  public actorDetail$: Observable<IActorDetailDto>;
  public actorCounters$: Observable<ICounterDto[]>;
  public actorEvents$: Observable<IMonitoringEventData[]>;
  public actorExceptions$: Observable<IMonitoringExceptionData[]>;

  private actorDetailService: ActorDetailService;

  view: any[] = [700, 200];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  eventsTableColumnsToDisplay = ['timestamp', 'event', 'type', 'message'];
  exceptionsTableColumnsToDisplay = ['timestamp', 'exception', 'message'];

  expandedElement: IMonitoringExceptionData;

  constructor(
    // private endpoint: EndpointWebApiService,
    private actorsStateService: ActorsStateService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.actor != null && changes.actor.currentValue != null) {
      // no need to get the data here, we've already sent a message to the store
      // this.refresh();

      this.actorDetailService = this.actorsStateService.getActorDetailService(this.actor.path);
      this.actorDetail$ = this.actorDetailService.detail$;
      this.actorCounters$ = this.actorDetailService.counters$;
      this.actorEvents$ = this.actorDetailService.events$;
      this.actorExceptions$ = this.actorDetailService.exceptions$;
    }
  }

  public refresh() {
    if (this.actor == null) {
      return;
    }

    this.actorsStateService.displayActor(this.actor.path);


    // the "old-way" of doing things: call a service and mutate the local state
    /*
    const actorPath = this.actor.path;
    const requestArgs = { path: actorPath };
    this.actorDetail$ = this.endpoint.GetActorDetail(requestArgs);
    this.actorCounters$ = this.endpoint.GetActorCounters(requestArgs);
    this.actorEvents$ = this.endpoint.GetActorEvents(requestArgs);
    this.actorExceptions$ = this.endpoint.GetActorExceptions(requestArgs);
    */
  }

}
