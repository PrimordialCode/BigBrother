import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ActorsStateService, actorsStateServiceFactory } from '../services/actors-state.service';
import { EndpointWebApiService, endpointWebApiServiceFactory } from '../../services/endpoint-web-api.service';
import { ConfigService } from '../../settings/config.service';
import { ActorDetailComponent } from '../actor-detail/actor-detail.component';
import { ActorGraphNode } from '../actors-graph/actprs-graph.models';


@Component({
  selector: 'app-actors-page',
  templateUrl: './actors-page.component.html',
  styleUrls: ['./actors-page.component.css'],
  providers: [
    {
      provide: EndpointWebApiService,
      useFactory: endpointWebApiServiceFactory,
      deps: [ConfigService, HttpClient, ActivatedRoute]
    },
    {
      provide: ActorsStateService,
      useFactory: actorsStateServiceFactory,
      deps: [ActivatedRoute, Store]
    }
  ]
})
export class ActorsPageComponent implements OnInit {

  public title = 'Actor System Inspector';
  public selectedActor: ActorGraphNode;
  @ViewChild('actorDetail') public actorDetailComponent: ActorDetailComponent;

  constructor(
    private _actorsStateService: ActorsStateService,
  ) {
    this.refreshActors();
  }

  ngOnInit() {
  }

  public refreshActors() {
    this._actorsStateService.refresh();
  }

  public selectActor(actor: ActorGraphNode) {
    this.selectedActor = actor;
    this._actorsStateService.displayActor(actor.path);
  }

  public refreshActor() {
    this.actorDetailComponent.refresh();
  }

}
