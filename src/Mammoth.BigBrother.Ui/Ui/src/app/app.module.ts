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
import { reducers } from './store/reducers';

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

const COVALENT_MODULES: any[] = [
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule,
];

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
    DashboardEndpointsComponent
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
    StoreModule.forRoot(reducers, { initialState: initialAppState })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
