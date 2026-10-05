import { Action, ActionTypes } from "./Actions";

export interface State {
  /** Index into `PRODUCTS` shown by the product deep-dive panel. */
  activeProduct: number;
}

export const initialState: State = {
  activeProduct: 0,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.SET_ACTIVE_PRODUCT: {
      return { ...state, activeProduct: action.payload };
    }
    default:
      return state;
  }
}
