import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMonitoringExceptionData } from '../../../models/endpoint-web-api.models';

@Component({
  selector: 'app-actor-detail-exceptions',
  templateUrl: './actor-detail-exceptions.component.html',
  styleUrls: ['./actor-detail-exceptions.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ActorDetailExceptionsComponent implements OnInit {

  @Input() actorExceptions$: Observable<IMonitoringExceptionData[]>;
  exceptionsTableColumnsToDisplay = ['timestamp', 'exception', 'message'];
  expandedElement: IMonitoringExceptionData;

  constructor() { }

  ngOnInit() {
  }

}
