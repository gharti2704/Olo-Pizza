export interface IPopularToppingsState {
  popularToppings: [string, number][];
  loading: boolean;
  error: string;
}

export interface PopularToppingsAction {
  type: string;
  payload: IPopularToppingsState;
}

export interface ComposePopularToppingProps {
  pizzaOrders: ITopping[];
  dispatch: React.Dispatch<PopularToppingsAction>;
  state: IPopularToppingsState;
}

export interface ListPopularToppingProps {
  popularToppings: [string, number][];
}

export interface ITopping {
  toppings: string[];
}
