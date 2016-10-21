import { Action } from '@ngrx/store';
import { DECREASE_BAR, INCREASE_BAR } from './actions';
import { Bar } from './baselineBar';

export interface Bar {
  counter: number;
}
const initialState: Bar = {
  category: "a",
  description: "b",
  basevalueId: 1,
  basevalue: 1,
  averagevalue: 1,
  delta: 1,
  modified: false
};

export const bars = (state = initialState, action: Action): Bar => {
  switch (action.type) {
    case INCREASE_BAR: {
      return  Object.assign({},state, {delta: state.delta + 5000}); 
    }
    case DECREASE_BAR: {
      return  Object.assign({},state, {delta: state.delta - 5000}); 
    }
    default: {
      return state;
    }
  }
}