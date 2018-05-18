import { Component, OnInit, OnDestroy } from '@angular/core';
import { EndpointWebApiService, ICounterDto } from '../services/endpoint-web-api.service';
import { timer, Subscription } from 'rxjs';

/**
 * displays some gauges that shows the current status of the application
 * Counters for:
 * - actors started, stopped, restarted, and so on
 * - the total number of exceptions
 */
@Component({
  selector: 'app-actors-overview',
  templateUrl: './actors-overview.component.html',
  styleUrls: ['./actors-overview.component.css']
})
export class ActorsOverviewComponent implements OnInit, OnDestroy {

  public counters: ICounterDto[] = [];
  private timerSubscription: Subscription;

  constructor(
    private endpoint: EndpointWebApiService
  ) { }

  ngOnInit() {
    this.refreshData();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription != null) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  private refreshData() {
    this.timerSubscription = timer(0, 5000).subscribe(() => {
      this.endpoint.GetGlobalCounters().then(
        counters => this.counters = counters
      );
    });
  }
}
