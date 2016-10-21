import { Action } from '@ngrx/store';
import { DECREASE_BAR, INCREASE_BAR, INIT } from './actions';
import { Bar } from './baselineBar';

export interface Bar {
  counter: number;
}
const initialBar: Bar = {
  category: "a",
  description: "b",
  basevalueId: 1,
  basevalue: 1,
  averagevalue: 1,
  delta: 1,
  modified: false
};
const initialState: Bar[] = [initialBar];

export const bars = (state = initialState, action: Action): Bar[] => {
  switch (action.type) {
    case INIT: {
      return  action.payload; 
    }
    case INCREASE_BAR: {
      return state.map( b => (b.basevalueId === action.payload) ? bar(b,action) : b );
    }
    case DECREASE_BAR: {
      return state.map( b => (b.basevalueId === action.payload) ? bar(b,action) : b );
    }
    default: {
      return state;
    }
  }
}

export const bar = (state = initialBar, action: Action): Bar => {
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