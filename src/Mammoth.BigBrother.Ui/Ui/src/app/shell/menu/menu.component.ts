import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { getConfiguration } from '../../store/reducers';
import { BehaviorSubject } from 'rxjs';

interface IMenuRoute {
  icon: string;
  // parameter for [routerLink]
  route: any[];
  title: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

  routes$ = new BehaviorSubject<IMenuRoute[]>(null);

  constructor(
    private store: Store<IAppState>
  ) {
    this.store.select(getConfiguration).subscribe(config => {
      const routes: IMenuRoute[] = [{
        icon: "home",
        route: ["/home"],
        title: "Home"
      }];
      // buildup the new routes
      for (const endpoint of config.endpoints) {
        routes.push({
          icon: "library_books",
          route: ["/actors", endpoint.name],
          title: endpoint.name
        });
      }
      this.routes$.next(routes);
    });
  }

  ngOnInit() {
  }

}
