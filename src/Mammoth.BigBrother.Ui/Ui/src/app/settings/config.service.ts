import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Configuration } from '../models/configuration.model';
import { ConfigurationLoaded, ConfigurationLoadFailed } from '../store/actions/configuration.actions';
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
    return new Promise<Configuration>((resolve, reject) => {
      this.http.get<Configuration>(url)
        .pipe(
          catchError(err => {
            this.store.dispatch(new ConfigurationLoadFailed(err));
            reject(err);
            return of<Configuration>(null);
          })
        )
        .subscribe(config => {
          if (config != null) {
            this.config = config;
            this.store.dispatch(new ConfigurationLoaded(config));
            resolve(config);
          }
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
