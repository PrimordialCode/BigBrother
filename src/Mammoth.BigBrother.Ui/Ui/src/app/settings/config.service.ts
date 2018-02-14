import { Injectable } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  private config: Configuration;
  constructor(private http: HttpClient) { }

  load(url: string) {
    return new Promise<Configuration>((resolve) => {
      this.http.get<Configuration>(url)
        .subscribe(config => {
          this.config = config;
          resolve(config);
        });
    });
  }

  getConfiguration(): Configuration {
    return this.config;
  }
}
