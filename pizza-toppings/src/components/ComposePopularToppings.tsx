import React, { useCallback, useEffect } from 'react';
import { ListPopularToppings } from './ListPopularToppings';
import { ACTIONS } from '../state/actions';
import {
  ComposePopularToppingProps,
  IPopularToppingsState,
  ITopping,
} from '../interfaces';

export const ComposePopularToppings: React.FC<ComposePopularToppingProps> = ({
  pizzaOrders,
  dispatch,
  state,
}: ComposePopularToppingProps) => {
  const { popularToppings, loading, error }: IPopularToppingsState = state;

  const calculatePopularToppings = useCallback(
    (orders: ITopping[]): void => {
      const toppingsCount: { [toppings: string]: number } = {};

      orders.forEach((order) => {
        const toppings = order.toppings.sort().join(',');

        if (toppings in toppingsCount) {
          toppingsCount[toppings]++;
        } else {
          toppingsCount[toppings] = 1;
        }
      });

      const sortedToppings = Object.entries(toppingsCount).sort(
        (a, b) => b[1] - a[1]
      );

      // Selct top 20 toppings
      const popularToppings = sortedToppings.slice(0, 20);

      dispatch({
        type: ACTIONS.POPULAR_TOPPINGS,
        payload: {
          popularToppings,
          loading: false,
          error: '',
        },
      });
    },
    [dispatch]
  );

  useEffect(() => {
    calculatePopularToppings(pizzaOrders);
  }, [calculatePopularToppings, pizzaOrders]);

  return (
    <div>
      {loading && <strong>Loading...</strong>}
      {error && <strong>{error}</strong>}
      {!loading && !error && (
        <ListPopularToppings popularToppings={popularToppings} />
      )}
    </div>
  );
};
