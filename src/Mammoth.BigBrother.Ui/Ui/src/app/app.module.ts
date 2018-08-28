import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxGraphModule } from '@swimlane/ngx-graph';

import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { CovalentMediaModule } from '@covalent/core/media';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { CovalentDataTableModule } from '@covalent/core/data-table';
import { CovalentNotificationsModule } from '@covalent/core/notifications';
import { CovalentMenuModule } from '@covalent/core/menu';
import { CovalentPagingModule } from '@covalent/core/paging';
import { CovalentStepsModule } from '@covalent/core/steps';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store/reducers';
import { effects } from './store/effects';

import { AppComponent } from './app.component';
import { ActorsGraphComponent } from './actors/actors-graph/actors-graph.component';
import { ActorDetailComponent } from './actors/actor-detail/actor-detail.component';
import { ActorsOverviewComponent } from './actors/actors-overview/actors-overview.component';

import { RouterModule } from '@angular/router';
import { ConfigService } from './settings/config.service';
import { environment } from '../environments/environment';
import { ActorsTreeviewComponent } from './actors/actors-treeview/actors-treeview.component';
import { initialAppState } from './store/state/app.state';
import { MenuComponent } from './shell/menu/menu.component';
import { DrawerMenuComponent } from './shell/drawer-menu/drawer-menu.component';
import { routes } from './app.routes';
import { HomePageComponent } from './home-page/home-page.component';
import { ActorsPageComponent } from './actors/actors-page/actors-page.component';
import { DashboardEndpointsComponent } from './home-page/dashboard-endpoints/dashboard-endpoints.component';
import { SingletonEndpointWebApiService } from './services/singleton-endpoint-web-api.service';
import { ActorDetailExceptionsComponent } from './actors/actor-detail/actor-detail-exceptions/actor-detail-exceptions.component';
import { ActorDetailEventsComponent } from './actors/actor-detail/actor-detail-events/actor-detail-events.component';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './store/router/router';
import { StorageService, LocalStorageService } from './services/storage.service';
import { NgrxStorageService } from './services/ngrx-storage.service';

const COVALENT_MODULES: any[] = [
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule,
];

/**
 * This configuration loader will execute some code to load the application configuration before
 * the actual application starts.
 * A function of the injected service will be called, that function will retuen a promise that
 * will be resolved once the configuration is loaded from the remote endpoint. The application initialization
 * will wait for this promise to be resolved before rendering the UI.
 * @param configService the application configuration service
 */
export function ConfigLoader(configService: ConfigService) {
  // Note: this factory needs to return a function (that returns a promise)
  return () => configService.load(environment.configFile);
}

// load the state from the local storage (in case of refresh)
const stateFromStorage = localStorage.getItem("ngrxstate");
const loadedInitalAppState = stateFromStorage != null ? JSON.parse(stateFromStorage) : {};
export function getStoreInitialState() {
  return { ...initialAppState, ...loadedInitalAppState };
}

@NgModule({
  declarations: [
    AppComponent,
    ActorsGraphComponent,
    ActorDetailComponent,
    ActorsOverviewComponent,
    ActorsTreeviewComponent,
    MenuComponent,
    DrawerMenuComponent,
    HomePageComponent,
    ActorsPageComponent,
    DashboardEndpointsComponent,
    ActorDetailExceptionsComponent,
    ActorDetailEventsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    COVALENT_MODULES,
    MaterialModule,
    NgxChartsModule,
    NgxGraphModule,
    StoreModule.forRoot(reducers, { initialState: getStoreInitialState }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    { provide: StorageService, useClass: LocalStorageService },
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    },
    SingletonEndpointWebApiService,
    NgrxStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    _ngrxStorageService: NgrxStorageService
  ) {
  }
}
