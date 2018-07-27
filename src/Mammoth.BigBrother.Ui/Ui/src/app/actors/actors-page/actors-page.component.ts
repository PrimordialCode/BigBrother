import { Component, OnInit, ViewChild } from '@angular/core';
import { EndpointWebApiService, endpointWebApiServiceFactory } from '../../services/endpoint-web-api.service';
import { ConfigService } from '../../settings/config.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ActorsStateService } from '../../services/actors-state.service';
import { ActorGraphNode } from '../../actors-graph/actprs-graph.models';
import { ActorDetailComponent } from '../../actor-detail/actor-detail.component';

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
    ActorsStateService
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

  public refreshActor() {
    this.actorDetailComponent.refresh();
  }

}
