import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EndpointWebApiService, IActorInfoDto } from '../services/endpoint-web-api.service';
import { ActorGraphNode } from '../actors-graph/actprs-graph.models';
import { TreeNode } from 'angular-tree-component';

@Component({
  selector: 'app-actors-treeview',
  templateUrl: './actors-treeview.component.html',
  styleUrls: ['./actors-treeview.component.css']
})
export class ActorsTreeviewComponent implements OnInit {

  public actors: IActorInfoDto;
  @Output() selected = new EventEmitter<ActorGraphNode>();

  constructor(
    private endpoint: EndpointWebApiService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  public async refresh() {
    const hierarchy = await this.endpoint.GetActorsHierarchy();
    this.fixForLayout(hierarchy);
    this.actors = hierarchy;
  }

  private fixForLayout(node: IActorInfoDto) {
    const fix = <any>node;
    fix.label = node.name;
    if (node.children != null && node.children.length > 0) {
      fix.isExpanded = true;
    }
    for (const n of node.children) {
      this.fixForLayout(n);
    }
  }

  public onActivate(node: any) {
    const n: IActorInfoDto = (<TreeNode>(node.node)).data;
    const selectedActor = new ActorGraphNode(n.path, n.path, n.name);
    this.selected.next(selectedActor);
  }

}
