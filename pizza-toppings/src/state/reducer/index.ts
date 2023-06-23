import { IPopularToppingsState, PopularToppingsAction } from '../../interfaces';
import { ACTIONS } from '../actions';

export const popularToppingsReducer = (
  state: IPopularToppingsState,
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
