import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationEndpoint } from '../models/configuration.model';
import { IActorDetailDto, IActorInfoDto, IActorRequestDto, ICounterDto, IMonitoringEventData, IMonitoringExceptionData } from '../models/endpoint-web-api.models';
import { ConfigService } from '../settings/config.service';

/**
 * Wraps the access to a single remote endpoint.
 * This implementation was designed to be registered as singleton
 * and it's better suited to operate with ngrx/effects.
 *
 * we need to pass the endpoint to which ask the data at each request
 */
@Injectable()
export class SingletonEndpointWebApiService {
  private static headers = new HttpHeaders().set('content-type', 'application/json');
  private endpoints: ConfigurationEndpoint[];

  constructor(
    configService: ConfigService,
    private http: HttpClient
  ) {
    configService.getConfiguration$().subscribe(endpoints => {
      if (endpoints != null) {
        this.endpoints = endpoints.endpoints;
      }
    });
  }

  private getEndpoinBaseAddress(endpointName: string): string {
    return this.endpoints.find(e => e.name === endpointName).endpoint + '/api/';
  }

  public GetActorsHierarchy(endpointName: string) {
    return this.http.get<IActorInfoDto>(this.getEndpoinBaseAddress(endpointName) + 'actors/gethierarchy');
  }

  public GetActorDetail(endpointName: string, args: IActorRequestDto) {
    return this.http.post<IActorDetailDto>(this.getEndpoinBaseAddress(endpointName) + 'actors/getactordetail',
      args,
      { headers: SingletonEndpointWebApiService.headers });
  }

  public GetCounters(endpointName: string): Promise<ICounterDto[]> {
    return this.http.get<ICounterDto[]>(this.getEndpoinBaseAddress(endpointName) + 'counters').toPromise();
  }

  public GetGlobalCounters(endpointName: string) {
    return this.http.get<ICounterDto[]>(this.getEndpoinBaseAddress(endpointName) + 'counters/GlobalCounters');
  }

  public GetActorCounters(endpointName: string, args: IActorRequestDto) {
    return this.http.post<ICounterDto[]>(this.getEndpoinBaseAddress(endpointName) + 'counters/GetActorsCounter', args, { headers: SingletonEndpointWebApiService.headers })
      .toPromise();
  }

  public GetEvents(endpointName: string) {
    return this.http.get(this.getEndpoinBaseAddress(endpointName) + 'events').toPromise();
  }

  public GetActorEvents(endpointName: string, args: IActorRequestDto) {
    return this.http.post<IMonitoringEventData[]>(
      this.getEndpoinBaseAddress(endpointName) + 'events/GetActorEvents', args, { headers: SingletonEndpointWebApiService.headers }
    ).toPromise();
  }

  public GetActorExceptions(endpointName: string, args: IActorRequestDto) {
    return this.http.post<IMonitoringExceptionData[]>(
      this.getEndpoinBaseAddress(endpointName) + 'exceptions/GetActorExceptions', args, { headers: SingletonEndpointWebApiService.headers }
    ).toPromise();
  }
}
