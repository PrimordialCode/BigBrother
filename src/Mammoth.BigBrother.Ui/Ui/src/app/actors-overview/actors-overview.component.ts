import { Component, OnInit } from '@angular/core';
import { EndpointWebApiService, ICounterDto } from '../services/endpoint-web-api.service';
import { timer } from 'rxjs';

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
export class ActorsOverviewComponent implements OnInit {

  public counters: ICounterDto[] = [];

  constructor(
    private endpoint: EndpointWebApiService
  ) { }

  ngOnInit() {
    this.refreshData();
  }

  private refreshData() {
    timer(0, 5000).subscribe(() => {
      this.endpoint.GetGlobalCounters().then(
        counters => this.counters = counters
      );
    });
  }
}
