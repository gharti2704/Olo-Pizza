import { PopularTopping } from './App';

export const ListTopping: React.FC<PopularTopping> = ({
  popularToppings,
}: PopularTopping) => {
  return (
    <>
      <ol>
        {popularToppings.map(
          ([topping, count]: [string, number], index: number) => (
            <li className="Card" key={count}>
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
