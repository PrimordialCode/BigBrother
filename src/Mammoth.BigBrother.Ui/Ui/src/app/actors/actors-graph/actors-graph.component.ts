import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import * as shape from 'd3-shape';
import { Subscription } from 'rxjs';
import { ActorsStateService } from '../../services/actors-state.service';
import { ActorGraphLink, ActorGraphNode, ActorsGraphData } from './actprs-graph.models';
import chartGroups from './chart-types';
import { colorSets } from './color-sets';
import { IActorInfoDto } from '../../models/endpoint-web-api.models';


@Component({
  selector: 'app-actors-graph',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './actors-graph.component.html',
  styleUrls: ['./actors-graph.component.scss']
})
export class ActorsGraphComponent implements OnInit, OnDestroy {
  @Input() customize = false;
  @Input() debug = false;
  @Output() selected = new EventEmitter<ActorGraphNode>();

  private hierarchySubscription: Subscription;

  public hierarchialGraph = new ActorsGraphData();

  theme = 'light';
  chartType = 'directed-graph';
  chartGroups: any;
  chart: any;

  view: any[];
  @Input() width = 700;
  @Input() height = 300;
  @Input() fitContainer = true;
  autoZoom = false;

  // options
  showLegend = false;
  orientation = 'TB'; // LR, RL, TB, BT
  orientations: any[] = [
    {
      label: 'Left to Right',
      value: 'LR'
    }, {
      label: 'Right to Left',
      value: 'RL'
    }, {
      label: 'Top to Bottom',
      value: 'TB'
    }, {
      label: 'Bottom to Top',
      value: 'BT'
    }
  ];

  // line interpolation
  curveType = 'Linear';
  curve: any = shape.curveLinear;
  interpolationTypes = [
    'Bundle', 'Cardinal', 'Catmull Rom', 'Linear', 'Monotone X',
    'Monotone Y', 'Natural', 'Step', 'Step After', 'Step Before'
  ];

  colorSets: any;
  colorScheme: any;
  schemeType = 'ordinal';
  selectedColorScheme: string;

  constructor(
    private _actorsStateService: ActorsStateService
  ) {
    Object.assign(this, {
      colorSets,
      chartGroups
    });

    this.setColorScheme('plain');
    this.setInterpolationType('Bundle');
  }

  ngOnInit() {
    if (!this.fitContainer) {
      this.applyDimensions();
    } else {
      this.view = undefined;
    }
    this.selectChart(this.chartType);
    this.hierarchySubscription = this._actorsStateService.hierarchyStore$.subscribe(hierarchy => {
      this.refresh(hierarchy);
    });
  }

  ngOnDestroy(): void {
    if (this.hierarchySubscription != null) {
      this.hierarchySubscription.unsubscribe();
      this.hierarchySubscription = null;
    }
  }

  private refresh(hierarchy: IActorInfoDto) {
    // build nodes and link traversing the tree
    const newGraph = new ActorsGraphData();
    if (hierarchy != null) {
      this.FillGraphData(hierarchy, newGraph);
    }
    this.hierarchialGraph.nodes = newGraph.nodes;
    this.hierarchialGraph.links = newGraph.links;
  }

  private sanitizePath(path: string): string {
    if (path == null || path === '') {
      return path;
    }
    return path.replace(/\//g, '_'); // does not like "/" in ids
  }

  private FillGraphData(node: IActorInfoDto, data: ActorsGraphData): void {
    // build the new node
    const n = new ActorGraphNode(this.sanitizePath(node.path), node.path, node.name);
    data.nodes.push(n);
    // iterate for all the children
    if (node.children != null) {
      for (const child of node.children) {
        // build all the links to the children
        const l = new ActorGraphLink(this.sanitizePath(node.path), this.sanitizePath(child.path));
        data.links.push(l);

        // process each child
        this.FillGraphData(child, data);
      }
    }
  }

  applyDimensions() {
    this.view = [this.width, this.height];
  }

  toggleFitContainer(fitContainer: boolean, autoZoom: boolean): void {
    this.fitContainer = fitContainer;
    this.autoZoom = autoZoom;

    if (this.fitContainer) {
      this.view = undefined;
    } else {
      this.applyDimensions();
    }
  }

  selectChart(chartSelector: string) {
    this.chartType = chartSelector;

    for (const group of this.chartGroups) {
      for (const chart of group.charts) {
        if (chart.selector === chartSelector) {
          this.chart = chart;
          return;
        }
      }
    }
  }

  select(data: ActorGraphNode) {
    console.log('Item clicked', data);
    this.selected.next(data);
  }

  setColorScheme(name: string) {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSets.find((s: any) => s.name === name);
  }

  setInterpolationType(curveType: string) {
    this.curveType = curveType;
    if (curveType === 'Bundle') {
      this.curve = shape.curveBundle.beta(1);
    }
    if (curveType === 'Cardinal') {
      this.curve = shape.curveCardinal;
    }
    if (curveType === 'Catmull Rom') {
      this.curve = shape.curveCatmullRom;
    }
    if (curveType === 'Linear') {
      this.curve = shape.curveLinear;
    }
    if (curveType === 'Monotone X') {
      this.curve = shape.curveMonotoneX;
    }
    if (curveType === 'Monotone Y') {
      this.curve = shape.curveMonotoneY;
    }
    if (curveType === 'Natural') {
      this.curve = shape.curveNatural;
    }
    if (curveType === 'Step') {
      this.curve = shape.curveStep;
    }
    if (curveType === 'Step After') {
      this.curve = shape.curveStepAfter;
    }
    if (curveType === 'Step Before') {
      this.curve = shape.curveStepBefore;
    }
  }

  onLegendLabelClick(entry: any) {
    console.log('Legend clicked', entry);
  }

  toggleExpand(node: any) {
    console.log('toggle expand', node);
  }

}
