import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EndpointWebApiService, IActorInfoDto } from '../services/endpoint-web-api.service';
import { ActorGraphNode } from '../actors-graph/actprs-graph.models';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import { of } from 'rxjs';

@Component({
  selector: 'app-actors-treeview',
  templateUrl: './actors-treeview.component.html',
  styleUrls: ['./actors-treeview.component.css']
})
export class ActorsTreeviewComponent implements OnInit {

  @Output() public selected = new EventEmitter<ActorGraphNode>();

  // Material Tree Control
  public nestedTreeControl: NestedTreeControl<IActorInfoDto>;
  public nestedDataSource: MatTreeNestedDataSource<IActorInfoDto>;
  // End Material Tree Control

  constructor(
    private endpoint: EndpointWebApiService
  ) {
    this.nestedTreeControl = new NestedTreeControl<IActorInfoDto>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }

  ngOnInit() {
    this.refresh();
  }

  public async refresh() {
    const hierarchy = await this.endpoint.GetActorsHierarchy();
    // let's exclude System/User cannot do anything with those
    this.nestedDataSource.data = hierarchy.children[0].children;
  }

  // Material Tree Control

  private _getChildren = (node: IActorInfoDto) => of(node.children);

  hasNestedChild = (_: number, nodeData: IActorInfoDto) => nodeData.children != null && nodeData.children.length > 0;

  public onActivate(n: IActorInfoDto) {
    const selectedActor = new ActorGraphNode(n.path, n.path, n.name);
    this.selected.next(selectedActor);
  }
  // End Material Tree Control

}
