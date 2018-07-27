import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { getConfiguration } from '../../store/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface IMenuRoute {
  // parameter for [routerLink]
  route: any[];
  title: string;
  cols: number;
  rows: number;
}

/**
 *displays all the endpoints in a gridview so the user can select them and navigate to the detail page
 *
 * @export
 * @class DashboardEndpointsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-dashboard-endpoints',
  templateUrl: './dashboard-endpoints.component.html',
  styleUrls: ['./dashboard-endpoints.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardEndpointsComponent implements OnInit {

  public route$: Observable<IMenuRoute[]>;

  constructor(
    private store: Store<IAppState>
  ) {
    this.route$ = this.store.select(getConfiguration)
      .pipe(
        map(config => {
          return config.endpoints.map(v => <IMenuRoute>{
            title: v.name,
            route: ["/actors", v.name],
            cols: 1,
            rows: 1
          });
        })
      );
  }

  ngOnInit() {
  }

}
