import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ICounterDto } from '../../models/endpoint-web-api.models';
import { ActorsStateService } from '../services/actors-state.service';

/**
 * displays some gauges that shows the current status of the application
 * Counters for:
 * - actors started, stopped, restarted, and so on
 * - the total number of exceptions
 */
@Component({
  selector: 'app-actors-overview',
  templateUrl: './actors-overview.component.html',
  styleUrls: ['./actors-overview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorsOverviewComponent implements OnInit {

  public readonly counters$: Observable<ICounterDto[]>;

  constructor(
    _actorsStateService: ActorsStateService,
  ) {
    this.counters$ = _actorsStateService.globalCounters$;
  }

  ngOnInit() {
  }
}
