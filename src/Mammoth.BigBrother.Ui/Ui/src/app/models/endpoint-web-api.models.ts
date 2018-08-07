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
