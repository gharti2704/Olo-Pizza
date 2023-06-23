export interface IPopularToppingsState {
  popularToppings: [string, number][];
  loading: boolean;
  error: string;
}

export type PopularToppingsAction = {
  type: string;
  payload: IPopularToppingsState;
};

export type ComposePopularToppingProps = {
  pizzaOrders: ITopping[];
  dispatch: React.Dispatch<PopularToppingsAction>;
  state: IPopularToppingsState;
};

export type ListPopularToppingProps = {
  popularToppings: [string, number][];
};

export interface ITopping {
  toppings: string[];
}
