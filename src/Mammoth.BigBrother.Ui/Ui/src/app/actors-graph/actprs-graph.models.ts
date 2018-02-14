export class ActorGraphNode {
  constructor(
    public id: string,
    public path: string,
    public label: string
  ) { }
}

export class ActorGraphLink {
  constructor(
    public source: string,
    public target: string,
    public label: string = ''
  ) { }
}

export class ActorsGraphData {
  public nodes: ActorGraphNode[] = [];
  public links: ActorGraphLink[] = [];
}
