import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IActorDetailDto, IActorInfoDto, IActorRequestDto, ICounterDto, IMonitoringEventData, IMonitoringExceptionData } from '../models/endpoint-web-api.models';
import { ConfigService } from '../settings/config.service';

/**
 * Wraps the access to a single remote endpoint.
 * This implementation was designed to be registered as singleton
 * and it's better suited to operate with ngrx/effects.
 *
 * we need to pass the endpoint to which ask the data at each request
 */
export class SingletonEndpointWebApiService {
  private static headers = new HttpHeaders().set('content-type', 'application/json');
  private baseAddress = ''; // 'http://localhost:5001/api/';
  private _name: string;
  public get name(): string {
    return this._name;
  }

  constructor(
    configService: ConfigService,
    private http: HttpClient
  ) {
    this.baseAddress = configService.getConfiguration().endpoint + '/api/';
  }

  public GetActorsHierarchy(): Observable<IActorInfoDto> {
    return this.http.get<IActorInfoDto>(this.baseAddress + 'actors/gethierarchy');
  }

  public GetActorDetail(args: IActorRequestDto): Promise<IActorDetailDto> {
    return this.http.post<IActorDetailDto>(this.baseAddress + 'actors/getactordetail',
      args,
      { headers: SingletonEndpointWebApiService.headers }).toPromise();
  }

  public GetCounters(): Promise<ICounterDto[]> {
    return this.http.get<ICounterDto[]>(this.baseAddress + 'counters').toPromise();
  }

  public GetGlobalCounters(): Promise<ICounterDto[]> {
    return this.http.get<ICounterDto[]>(this.baseAddress + 'counters/GlobalCounters').toPromise();
  }

  public GetActorCounters(args: IActorRequestDto) {
    return this.http.post<ICounterDto[]>(this.baseAddress + 'counters/GetActorsCounter', args, { headers: SingletonEndpointWebApiService.headers })
      .toPromise();
  }

  public GetEvents() {
    return this.http.get(this.baseAddress + 'events').toPromise();
  }

  public GetActorEvents(args: IActorRequestDto) {
    return this.http.post<IMonitoringEventData[]>(
      this.baseAddress + 'events/GetActorEvents', args, { headers: SingletonEndpointWebApiService.headers }
    ).toPromise();
  }

  public GetActorExceptions(args: IActorRequestDto) {
    return this.http.post<IMonitoringExceptionData[]>(
      this.baseAddress + 'exceptions/GetActorExceptions', args, { headers: SingletonEndpointWebApiService.headers }
    ).toPromise();
  }

}
