import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../settings/config.service';

@Injectable()
export class EndpointWebApiService {
  private static headers = new HttpHeaders().set('content-type', 'application/json');
  private baseAddress = ''; // 'http://localhost:5001/api/';

  /*
  constructor(
    configService: ConfigService,
    private http: HttpClient
  ) {
    this.baseAddress = configService.getConfiguration().endpoint + '/api/';
  }
  */

  constructor(
    private http: HttpClient,
    endpoint: string
  ) {
    this.baseAddress = endpoint + '/api/';
  }

  public GetActorsHierarchy(): Promise<IActorInfoDto> {
    return this.http.get<IActorInfoDto>(this.baseAddress + 'actors/gethierarchy').toPromise();
  }

  public GetActorDetail(args: IActorRequestDto): Promise<IActorDetailDto> {
    return this.http.post<IActorDetailDto>(this.baseAddress + 'actors/getactordetail',
      args,
      { headers: EndpointWebApiService.headers }).toPromise();
  }

  public GetCounters(): Promise<ICounterDto[]> {
    return this.http.get<ICounterDto[]>(this.baseAddress + 'counters').toPromise();
  }

  public GetGlobalCounters(): Promise<ICounterDto[]> {
    return this.http.get<ICounterDto[]>(this.baseAddress + 'counters/GlobalCounters').toPromise();
  }

  public GetActorCounters(args: IActorRequestDto) {
    return this.http.post<ICounterDto[]>(this.baseAddress + 'counters/GetActorsCounter', args, { headers: EndpointWebApiService.headers })
      .toPromise();
  }

  public GetEvents() {
    return this.http.get(this.baseAddress + 'events').toPromise();
  }

  public GetActorEvents(args: IActorRequestDto) {
    return this.http.post<IMonitoringEventData[]>(
      this.baseAddress + 'events/GetActorEvents', args, { headers: EndpointWebApiService.headers }
    ).toPromise();
  }

  public GetActorExceptions(args: IActorRequestDto) {
    return this.http.post<IMonitoringExceptionData[]>(
      this.baseAddress + 'exceptions/GetActorExceptions', args, { headers: EndpointWebApiService.headers }
    ).toPromise();
  }

}

export function endpointWebApiServiceFactory(configService: ConfigService, http: HttpClient, route: ActivatedRoute): EndpointWebApiService {
  // get the config from the route parameter
  const endpointName = route.snapshot.params["name"] as string;
  const endpoint = configService.getConfiguration().endpoints.find(p => p.name === endpointName).endpoint;
  return new EndpointWebApiService(http, endpoint);
}

export interface IActorInfoDto {
  name: string;
  path: string;
  children: IActorInfoDto[];
}

export interface IActorRequestDto {
  path: string;
}

export interface ICounterDto {
  name: string;
  value: number;
}

export interface IMonitoringEventData {
  timestamp: string;
  event: string;
  properties: { [key: string]: string };
}

export interface IMonitoringExceptionData {
  timestamp: string;
  exception: string;
  properties: { [key: string]: string };
}

export interface IActorDetailDto {
  // 0 = started, 1 = stopped
  status: number;
}
