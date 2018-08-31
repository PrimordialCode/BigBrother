import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorsOverviewComponent implements OnInit {

  // The "asyncpipe" binding in the template will make the control update correctly
  // event with OnPush strategy: the async pipe will markForCheck() the current component
  // and it parents causing binding evaluation.
  // everythis will keep working if the instance of the observable exposed by the underlying
  // service does not change (that is: the service will continue emit values on the
  // original observable)
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
