export class Bar {
  category:string;
  description: string;
  basevalueId: number;
  basevalue: number;
  averagevalue: number;
  delta: number;
  modified: boolean;
}

export class BaselineBar {
  baselineId: number;
  name: string;
  revenue: number;
  bars: Bar[];
}
