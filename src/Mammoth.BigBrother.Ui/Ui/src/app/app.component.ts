import { Component, ViewChild } from '@angular/core';

import { ActorGraphNode } from './actors-graph/actprs-graph.models';
import { ActorsGraphComponent } from './actors-graph/actors-graph.component';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Actor System Inspector';
  public selectedActor: ActorGraphNode;
  @ViewChild('actorsGraph')
  public actorsGraphComponent: ActorsGraphComponent;
  @ViewChild('actorDetail')
  public actorDetailComponent: ActorDetailComponent;

  routes = [{
    icon: 'home',
    route: '.',
    title: 'Home',
  }, {
    icon: 'library_books',
    route: '.',
    title: 'Documentation',
  }, {
    icon: 'color_lens',
    route: '.',
    title: 'Style Guide',
  }, {
    icon: 'view_quilt',
    route: '.',
    title: 'Layouts',
  }, {
    icon: 'picture_in_picture',
    route: '.',
    title: 'Components & Addons',
  },
  ];
  usermenu = [{
    icon: 'swap_horiz',
    route: '.',
    title: 'Switch account',
  }, {
    icon: 'tune',
    route: '.',
    title: 'Account settings',
  }, {
    icon: 'exit_to_app',
    route: '.',
    title: 'Sign out',
  },
  ];

  public refreshActors() {
    this.actorsGraphComponent.refresh();
  }

  public refreshActor() {
    this.actorDetailComponent.refresh();
  }
}
