import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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

import { AppComponent } from './app.component';
import { ActorsGraphComponent } from './actors-graph/actors-graph.component';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';
import { EndpointWebApiService } from './services/endpoint-web-api.service';
import { ActorsOverviewComponent } from './actors-overview/actors-overview.component';

import { RouterModule } from '@angular/router';
import { ConfigService } from './settings/config.service';
import { environment } from '../environments/environment';
import { ActorsTreeviewComponent } from './actors-treeview/actors-treeview.component';

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
    ActorsTreeviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    COVALENT_MODULES,
    MaterialModule,
    NgxChartsModule,
    NgxGraphModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    },
    EndpointWebApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
