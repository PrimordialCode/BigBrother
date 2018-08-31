import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActorDetailComponent } from '../actor-detail/actor-detail.component';
import { ActorGraphNode } from '../actors-graph/actprs-graph.models';
import { ActorsStateService } from '../services/actors-state.service';

@Component({
  selector: 'app-actors-page',
  templateUrl: './actors-page.component.html',
  styleUrls: ['./actors-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    /*
    {
      provide: EndpointWebApiService,
      useFactory: endpointWebApiServiceFactory,
      deps: [ConfigService, HttpClient, ActivatedRoute]
    },
    */
   ActorsStateService,
    /*
    {
      provide: ActorsStateService,
      useFactory: actorsStateServiceFactory,
      deps: [Store]
    }
    */
  ]
})
export class ActorsPageComponent implements OnInit, OnDestroy {
  public get hierarchy$() {
    return this._actorsStateService.hierarchy$;
  }
  public get selectedActor$() {
    return this._actorsStateService.selectedActor$;
  }
  @ViewChild('actorDetail') public actorDetailComponent: ActorDetailComponent;
  private routeSubscription: Subscription;

  constructor(
    private _actorsStateService: ActorsStateService,
    route: ActivatedRoute
  ) {
    this.routeSubscription = route.params.subscribe(params => this._actorsStateService.init(params.name));
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
