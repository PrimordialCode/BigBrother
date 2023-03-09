import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { MaterialModule } from './material/material.module';


import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { CovalentMenuModule } from '@covalent/core/menu';
import { CovalentSearchModule } from '@covalent/core/search';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { effects } from './store/effects';
import { reducers } from './store/reducers';

import { ActorDetailComponent } from './actors/actor-detail/actor-detail.component';
import { ActorsGraphComponent } from './actors/actors-graph/actors-graph.component';
import { ActorsOverviewComponent } from './actors/actors-overview/actors-overview.component';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { FullRouterStateSerializer, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../environments/environment';
import { ActorDetailEventsComponent } from './actors/actor-detail/actor-detail-events/actor-detail-events.component';
import { ActorDetailExceptionsComponent } from './actors/actor-detail/actor-detail-exceptions/actor-detail-exceptions.component';
import { ActorsPageComponent } from './actors/actors-page/actors-page.component';
import { ActorsTreeviewComponent } from './actors/actors-treeview/actors-treeview.component';
import { routes } from './app.routes';
import { DashboardEndpointsComponent } from './home-page/dashboard-endpoints/dashboard-endpoints.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SingletonEndpointWebApiService } from './services/singleton-endpoint-web-api.service';
import { ConfigService } from './settings/config.service';
import { DrawerMenuComponent } from './shell/drawer-menu/drawer-menu.component';
import { MenuComponent } from './shell/menu/menu.component';
import { CustomRouterStateSerializer } from './store/router/router';
import { initialAppState } from './store/state/app.state';

const COVALENT_MODULES: any[] = [
  CovalentLoadingModule,
  CovalentLayoutModule, CovalentMenuModule,
  CovalentSearchModule,
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
  // Note: this factory need to return a function (that return a promise)
  return () => configService.load(environment.configFile);
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
    RouterModule.forRoot(routes, {}),
    COVALENT_MODULES,
    MaterialModule,
    NgxChartsModule,
    NgxGraphModule,
    StoreModule.forRoot(reducers, { initialState: initialAppState }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot({ serializer: FullRouterStateSerializer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    },
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    SingletonEndpointWebApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
