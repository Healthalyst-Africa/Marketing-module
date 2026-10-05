"use client";

import {
  createContext,
  Dispatch,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { Action, setActiveProduct } from "./Actions";
import { initialState, reducer, State } from "./Reducers";

type ProductsContextValue = {
  state: State;
  dispatch: Dispatch<Action>;
  /** Select a product by index. */
  selectProduct: (index: number) => void;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<ProductsContextValue>(
    () => ({
      state,
      dispatch,
      selectProduct: (index: number) => dispatch(setActiveProduct(index)),
    }),
    [state]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts(): ProductsContextValue {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error("useProducts must be used within a <ProductsProvider>");
  }
  return ctx;
}
