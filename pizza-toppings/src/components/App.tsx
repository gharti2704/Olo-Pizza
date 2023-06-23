import React, { useEffect, useState, useReducer, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import { ComposePopularToppings } from './ComposePopularToppings';
import { popularToppingsReducer } from '../state/reducer';
import { ACTIONS } from '../state/actions';
import { IPopularToppingsState, ITopping } from '../interfaces';

export const initialState: IPopularToppingsState = {
  popularToppings: [],
  loading: false,
  error: '',
};

export const App: React.FC = () => {
  const [pizzaOrders, setPizzaOrders] = useState<ITopping[]>([]);
  const [state, dispatch] = useReducer(popularToppingsReducer, initialState);

  const fetchPizzaOrders = useCallback(async () => {
    try {
      dispatch({
        type: ACTIONS.POPULAR_TOPPINGS_PENDING,
        payload: {
          popularToppings: [],
          loading: true,
          error: '',
        },
      });

      const response = await axios.get<ITopping[]>(
        'http://files.olo.com/pizzas.json'
      );
      if (response.status !== 200) {
        dispatch({
          type: ACTIONS.POPULAR_TOPPINGS_REJECTED,
          payload: {
            popularToppings: [],
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
            popularToppings: [],
            loading: false,
            error: error.message,
          },
        });
      }
    }
  }, [dispatch]);

  useEffect(() => {
    fetchPizzaOrders();
  }, [fetchPizzaOrders]);

  return (
    <>
      <div className="app">
        <h1>Top 20 Most Frequently Ordered Pizza Topping Combinations</h1>
        <ComposePopularToppings
          pizzaOrders={pizzaOrders}
          dispatch={dispatch}
          state={state}
        />
      </div>
    </>
  );
};
