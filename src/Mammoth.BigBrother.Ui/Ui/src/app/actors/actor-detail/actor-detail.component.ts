import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core/data-table/covalent-core-data-table';

import { ActorGraphNode } from '../actors-graph/actprs-graph.models';
import { IActorDetailDto, ICounterDto, IMonitoringEventData, IMonitoringExceptionData } from '../../models/endpoint-web-api.models';
import { EndpointWebApiService } from '../../services/endpoint-web-api.service';


@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css'],
})
export class ActorDetailComponent implements OnInit, OnChanges {
  @Input() actor: ActorGraphNode;

  public actorDetail: IActorDetailDto;
  public actorCounters: ICounterDto[] = [];
  public actorEvents: IMonitoringEventData[] = [];
  public actorExceptions: IMonitoringExceptionData[] = [];

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
    private endpoint: EndpointWebApiService
  ) { }

  ngOnInit() {
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.actor != null && changes.actor.currentValue != null) {
      this.refresh();
    }
  }

  public async refresh() {
    if (this.actor == null) {
      return;
    }
    const actorPath = this.actor.path;
    const requestArgs = { path: actorPath };
    this.actorDetail = await this.endpoint.GetActorDetail(requestArgs);
    this.actorCounters = await this.endpoint.GetActorCounters(requestArgs);
    this.actorEvents = await this.endpoint.GetActorEvents(requestArgs);
    this.actorExceptions = await this.endpoint.GetActorExceptions(requestArgs);
  }

}
