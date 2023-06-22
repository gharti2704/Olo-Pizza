import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import './App.css';
import { ListTopping } from './ListPopularTopping';
import {
  ACTIONS,
  popularToppingsReducer,
  initialState,
  IPopularToppingsState,
  PopularToppingsAction,
} from '../reducer';

interface ITopping {
  toppings: string[];
}

export const App: React.FC = () => {
  const [pizzaOrders, setPizzaOrders] = useState<ITopping[]>([]);
  const [state, dispatch] = useReducer<
    (
      state: IPopularToppingsState,
      action: PopularToppingsAction
    ) => IPopularToppingsState
  >(popularToppingsReducer, initialState);

  const calculatePopularToppings = (orders: ITopping[]): void => {
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
  };

  useEffect(() => {
    const fetchPizzaToppings = async () => {
      try {
        const response = await axios.get<ITopping[]>(
          'http://files.olo.com/pizzas.json'
        );
        if (response.status !== 200) {
          dispatch({
            type: ACTIONS.POPULAR_TOPPINGS_REJECTED,
            payload: {
              popularToppings: state.popularToppings,
              loading: false,
              error: 'Error fetching pizza toppings.',
            },
          });
        } else {
          setPizzaOrders(response.data);
        }
      } catch (error) {
        if (error instanceof Error) {
          dispatch({
            type: ACTIONS.POPULAR_TOPPINGS_REJECTED,
            payload: {
              popularToppings: state.popularToppings,
              loading: false,
              error: error.message,
            },
          });
        }
      }
    };

    dispatch({
      type: ACTIONS.POPULAR_TOPPINGS_PENDING,
      payload: {
        popularToppings: state.popularToppings,
        loading: true,
        error: '',
      },
    });

    fetchPizzaToppings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pizzaOrders.length > 0) {
      calculatePopularToppings(pizzaOrders);
    }
  }, [pizzaOrders]);

  return (
    <div className="App">
      <h1>Top 20 Most Frequently Ordered Pizza Topping Combinations</h1>
      {state.loading && <strong>Loading...</strong>}
      {state.error && <strong>{state.error}</strong>}
      {!state.loading && !state.error && (
        <ListTopping popularToppings={state.popularToppings} />
      )}
    </div>
  );
};
