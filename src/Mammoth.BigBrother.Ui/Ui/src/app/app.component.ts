import { Component, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { ActorDetailComponent } from './actor-detail/actor-detail.component';
import { ActorGraphNode } from './actors-graph/actprs-graph.models';
import { ActorsStateService } from './services/actors-state.service';
import { IAppState } from './store/state/app.state';
import { Store } from '@ngrx/store';
import { getConfiguration } from './store/reducers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Actor System Inspector';
  public selectedActor: ActorGraphNode;
  @ViewChild('actorDetail')
  public actorDetailComponent: ActorDetailComponent;

  constructor(
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private _actorsStateService: ActorsStateService,
    private store: Store<IAppState>
  ) {
    this.store.select(getConfiguration).subscribe(config => {
      console.log("BigBrather UI started.");
      console.log(JSON.stringify(config));
    });

    this.refreshActors();

    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'github',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent-mark.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-ux',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-ux.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'listener',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'querygrid',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'mammoth',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/mammoth.svg'));
  }

  public refreshActors() {
    this._actorsStateService.refresh();
  }

  public refreshActor() {
    this.actorDetailComponent.refresh();
  }
}
