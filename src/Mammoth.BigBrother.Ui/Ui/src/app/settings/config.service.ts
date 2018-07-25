import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Configuration } from '../models/configuration.model';
import { ConfigurationLoaded } from '../store/actions/configuration.actions';
import * as fromStore from "../store/reducers";
import { IAppState } from '../store/state/app.state';

@Injectable()
export class ConfigService {

  private config: Configuration;

  constructor(
    private http: HttpClient,
    private store: Store<IAppState>
  ) { }

  load(url: string) {
    return new Promise<Configuration>((resolve) => {
      this.http.get<Configuration>(url)
        .subscribe(config => {
          this.config = config;
          this.store.dispatch(new ConfigurationLoaded(config));
          resolve(config);
        });
    });
  }

  getConfiguration(): Configuration {
    return this.config;
  }

  getConfiguration$() {
    return this.store.select(fromStore.getConfiguration);
  }
}
