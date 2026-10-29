/** Action names for the products store. */
export const ActionTypes = {
  SET_ACTIVE_PRODUCT: "SET_ACTIVE_PRODUCT",
} as const;

export type Action = {
  type: typeof ActionTypes.SET_ACTIVE_PRODUCT;
  /** Index into `PRODUCTS` that should be shown in the deep-dive panel. */
  payload: number;
};

/** Select a product to show in the deep-dive panel. */
export const setActiveProduct = (index: number): Action => ({
  type: ActionTypes.SET_ACTIVE_PRODUCT,
  payload: index,
});
