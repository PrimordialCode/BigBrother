import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IActorInfoDto } from '../../models/endpoint-web-api.models';
import { EndpointWebApiService, endpointWebApiServiceFactory } from '../../services/endpoint-web-api.service';
import { ConfigService } from '../../settings/config.service';
import { ActorDetailComponent } from '../actor-detail/actor-detail.component';
import { ActorGraphNode } from '../actors-graph/actprs-graph.models';
import { ActorsStateService, actorsStateServiceFactory } from '../services/actors-state.service';
import { Store } from '@ngrx/store';

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
      deps: [Store]
    }
  ]
})
export class ActorsPageComponent implements OnInit, OnDestroy {
  public hierarchy$: Observable<IActorInfoDto>;
  public selectedActor$: Observable<string>;
  @ViewChild('actorDetail') public actorDetailComponent: ActorDetailComponent;
  private routeSubscription: Subscription;

  constructor(
    private _actorsStateService: ActorsStateService,
    route: ActivatedRoute
  ) {
    this.routeSubscription = route.params.subscribe(params => this._actorsStateService.init(params.name));

    this.hierarchy$ = _actorsStateService.hierarchy$;
    this.selectedActor$ = _actorsStateService.selectedActor$;
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.routeSubscription != null) {
      this.routeSubscription.unsubscribe();
    }
  }

  public refreshActors() {
    this._actorsStateService.refresh();
  }

  public selectActor(actor: ActorGraphNode) {
    this._actorsStateService.displayActor(actor.path);
  }

  public refreshActor() {
    this.actorDetailComponent.refresh();
  }

}
