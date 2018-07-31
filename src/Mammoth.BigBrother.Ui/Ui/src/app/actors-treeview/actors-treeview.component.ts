import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material';
import { of, Subscription } from 'rxjs';

import { ActorGraphNode } from '../actors-graph/actprs-graph.models';
import { ActorsStateService } from '../services/actors-state.service';
import { IActorInfoDto } from '../services/endpoint-web-api.service';

@Component({
  selector: 'app-actors-treeview',
  templateUrl: './actors-treeview.component.html',
  styleUrls: ['./actors-treeview.component.css']
})
export class ActorsTreeviewComponent implements OnInit, OnDestroy {
  @Output() public selected = new EventEmitter<ActorGraphNode>();
  private hierarchySubscription: Subscription;
  // Material Tree Control
  public nestedTreeControl: NestedTreeControl<IActorInfoDto>;
  public nestedDataSource: MatTreeNestedDataSource<IActorInfoDto>;
  // End Material Tree Control

  constructor(
    private _actorsStateService: ActorsStateService
  ) {
    this.nestedTreeControl = new NestedTreeControl<IActorInfoDto>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }

  ngOnInit() {
    this.hierarchySubscription = this._actorsStateService.hierarchyStore$.subscribe(hierarchy => {
      if (hierarchy != null) {
        // save the actuale expansion model
        const expanded = this.nestedTreeControl.expansionModel.selected;
        this.nestedTreeControl.expansionModel.clear();

        // try to expand the new nodes as the previous ones (we update the state of the expanded nodes before updating the datasource)
        if (expanded != null && expanded.length > 0) {
          this.selectNodes(expanded, hierarchy);
        }

        // let's exclude System/User cannot do anything with those (should be done by the metrics plugin)
        this.nestedDataSource.data = [hierarchy];
      } else {
        this.nestedDataSource.data = [];
      }
    });
  }

  ngOnDestroy(): void {
    if (this.hierarchySubscription != null) {
      this.hierarchySubscription.unsubscribe();
    }
  }

  // quite inefficient
  selectNodes(expanded: IActorInfoDto[], hierarchy: IActorInfoDto) {
    // look the current node can be expanded
    if (expanded.findIndex(e => e.path === hierarchy.path) > -1) {
      this.nestedTreeControl.expand(hierarchy);
      // if a node has to be expanded also check its children
      for (const child of hierarchy.children) {
        this.selectNodes(expanded, child);
      }
    }
  }

  trackByFn(index: number, item: IActorInfoDto): string {
    console.log(index);
    return item.path;
  }

  // Material Tree Control

  private _getChildren = (node: IActorInfoDto) => of(node.children);

  public hasNestedChild =
    (_: number, nodeData: IActorInfoDto) => nodeData != null && nodeData.children != null && nodeData.children.length > 0

  public onActivate(n: IActorInfoDto) {
    const selectedActor = new ActorGraphNode(n.path, n.path, n.name);
    this.selected.next(selectedActor);
  }

  // End Material Tree Control

}
