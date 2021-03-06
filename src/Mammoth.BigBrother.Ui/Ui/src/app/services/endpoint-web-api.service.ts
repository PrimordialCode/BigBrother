import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IActorDetailDto, IActorInfoDto, IActorRequestDto, ICounterDto, IMonitoringEventData, IMonitoringExceptionData } from '../models/endpoint-web-api.models';
import { ConfigService } from '../settings/config.service';

/**
 * Wraps the access to a single remote endpoint.
 * This implementation was designed to be resolved for each specific endpoint
 * given a value on the query string that identified the endpoint to which ask the data
 * instead of passing the parameter to each request.
 *
 * It does not operate well with ngrx/effects.
 */
export class EndpointWebApiService {
  private static headers = new HttpHeaders().set('content-type', 'application/json');
  private baseAddress = ''; // 'http://localhost:5001/api/';
  private _name: string;
  public get name(): string {
    return this._name;
  }

  constructor(
    private http: HttpClient,
    name: string,
    endpoint: string
  ) {
    this._name = name;
    this.baseAddress = endpoint + '/api/';
  }

  public GetActorsHierarchy(): Observable<IActorInfoDto> {
    return this.http.get<IActorInfoDto>(this.baseAddress + 'actors/gethierarchy');
  }

  public GetActorDetail(args: IActorRequestDto) {
    return this.http.post<IActorDetailDto>(this.baseAddress + 'actors/getactordetail',
      args,
      { headers: EndpointWebApiService.headers });
  }

  public GetCounters() {
    return this.http.get<ICounterDto[]>(this.baseAddress + 'counters');
  }

  public GetGlobalCounters() {
    return this.http.get<ICounterDto[]>(this.baseAddress + 'counters/GlobalCounters');
  }

  public GetActorCounters(args: IActorRequestDto) {
    return this.http.post<ICounterDto[]>(this.baseAddress + 'counters/GetActorsCounter', args, { headers: EndpointWebApiService.headers });
  }

  public GetEvents() {
    return this.http.get(this.baseAddress + 'events');
  }

  public GetActorEvents(args: IActorRequestDto) {
    return this.http.post<IMonitoringEventData[]>(
      this.baseAddress + 'events/GetActorEvents', args, { headers: EndpointWebApiService.headers }
    );
  }

  public GetActorExceptions(args: IActorRequestDto) {
    return this.http.post<IMonitoringExceptionData[]>(
      this.baseAddress + 'exceptions/GetActorExceptions', args, { headers: EndpointWebApiService.headers }
    );
  }

}

export function endpointWebApiServiceFactory(configService: ConfigService, http: HttpClient, route: ActivatedRoute): EndpointWebApiService {
  // get the config from the route parameter
  const endpointName = route.snapshot.params["name"] as string;
  const endpoint = configService.getConfiguration().endpoints.find(p => p.name === endpointName).endpoint;
  return new EndpointWebApiService(http, endpointName, endpoint);
}

