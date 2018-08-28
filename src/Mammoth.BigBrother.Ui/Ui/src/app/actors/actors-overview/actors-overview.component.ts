import { Component, OnInit } from '@angular/core';
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
  // cannot use OnPush strategy right now, Angular will not detect changes to the observable exposed by the service.
  // the service will create new observables each time the endpoint changes (we'll change this behavior).
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorsOverviewComponent implements OnInit {

  public get counters$() {
    return this.actorsStateService.globalCounters$;
  }

  constructor(
    private actorsStateService: ActorsStateService
  ) {
  }

  ngOnInit() {
  }
}
