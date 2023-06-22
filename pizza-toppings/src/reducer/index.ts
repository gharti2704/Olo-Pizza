export interface IPopularToppingsState {
  popularToppings: [string, number][];
  loading: boolean;
  error: string;
}

export const initialState: IPopularToppingsState = {
  popularToppings: [],
  loading: false,
  error: '',
};

export interface PopularToppingsAction {
  type: string;
  payload: IPopularToppingsState;
}

export const ACTIONS = {
  POPULAR_TOPPINGS: 'POPULAR_TOPPINGS',
  POPULAR_TOPPINGS_PENDING: 'POPULAR_TOPPINGS_PENDING',
  POPULAR_TOPPINGS_REJECTED: 'POPULAR_TOPPINGS_REJECTED',
};

export const popularToppingsReducer = (
  state: IPopularToppingsState = initialState,
  action: PopularToppingsAction
) => {
  switch (action.type) {
    case ACTIONS.POPULAR_TOPPINGS:
      return {
        ...state,
        popularToppings: action.payload.popularToppings,
        loading: false,
      };
    case ACTIONS.POPULAR_TOPPINGS_PENDING:
      return { ...state, loading: true };
    case ACTIONS.POPULAR_TOPPINGS_REJECTED:
      return {
        ...state,
        popularToppings: action.payload.popularToppings,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
