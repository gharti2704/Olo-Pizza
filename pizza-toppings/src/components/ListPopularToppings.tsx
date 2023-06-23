import { ListPopularToppingProps } from '../interfaces';

export const ListPopularToppings: React.FC<ListPopularToppingProps> = ({
  popularToppings,
}: ListPopularToppingProps) => {
  return (
    <>
      <ol>
        {popularToppings.map(
          ([topping, count]: [string, number], index: number) => (
            <li className="card" key={count}>
              <strong>Rank: {index + 1}</strong>
              <br />
              <strong>Toppings: </strong>
              {topping.split(',').join(', ')}
              <br />
              <strong>Order Count: </strong>
              {count}
              <br />
            </li>
          )
        )}
      </ol>
    </>
  );
};
