import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IMonitoringEventData } from '../../../models/endpoint-web-api.models';

@Component({
  selector: 'app-actor-detail-events',
  templateUrl: './actor-detail-events.component.html',
  styleUrls: ['./actor-detail-events.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActorDetailEventsComponent implements OnInit {

  @Input() actorEvents$: IMonitoringEventData[];
  public eventsTableColumnsToDisplay = ['timestamp', 'event', 'type', 'message'];

  constructor() { }

  ngOnInit() {
  }

}
