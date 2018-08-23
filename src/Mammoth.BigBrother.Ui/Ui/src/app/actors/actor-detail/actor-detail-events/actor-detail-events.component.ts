import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { IMonitoringEventData } from '../../../models/endpoint-web-api.models';

@Component({
  selector: 'app-actor-detail-events',
  templateUrl: './actor-detail-events.component.html',
  styleUrls: ['./actor-detail-events.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActorDetailEventsComponent implements OnInit {

  @Input() actorEvents$: Observable<IMonitoringEventData[]>;
  public eventsTableColumnsToDisplay = ['timestamp', 'event', 'type', 'message'];

  constructor() { }

  ngOnInit() {
  }

}
