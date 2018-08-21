import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core/data-table/covalent-core-data-table';
import { IActorDetailDto, ICounterDto, IMonitoringEventData, IMonitoringExceptionData } from '../../models/endpoint-web-api.models';
import { EndpointWebApiService } from '../../services/endpoint-web-api.service';
import { ActorGraphNode } from '../actors-graph/actprs-graph.models';
import { ActorDetailService } from '../services/actor-detail.service';
import { ActorsStateService } from '../services/actors-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css'],
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

  eventsTableColumns: ITdDataTableColumn[] = [
    { name: 'timestamp', label: 'Timestamp' },
    { name: 'event', label: 'Event' },
  ];

  exceptionsTableColumns: ITdDataTableColumn[] = [
    { name: 'timestamp', label: 'Timestamp' },
    { name: 'exception.ClassName', label: 'Exception' },
    { name: 'exception.Message', label: 'Message' },
    { name: 'exception.StackTraceString', label: 'Stacktrace' }
  ];

  constructor(
    private endpoint: EndpointWebApiService,
    private actorsStateService: ActorsStateService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.actor != null && changes.actor.currentValue != null) {
      this.refresh();

      this.actorDetailService = this.actorsStateService.getActorDetailService(this.actor.path);
      this.actorDetail$ = this.actorDetailService.detail$;
    }
  }

  // the "old-way" of doing things: call a service and mutate the local state
  public refresh() {
    if (this.actor == null) {
      return;
    }
    const actorPath = this.actor.path;
    const requestArgs = { path: actorPath };
    this.actorDetail$ = this.endpoint.GetActorDetail(requestArgs);
    this.actorCounters$ = this.endpoint.GetActorCounters(requestArgs);
    this.actorEvents$ = this.endpoint.GetActorEvents(requestArgs);
    this.actorExceptions$ = this.endpoint.GetActorExceptions(requestArgs);
  }

}
