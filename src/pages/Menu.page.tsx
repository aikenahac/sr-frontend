import { Grid, PictureCard, Button } from '@kiwicom/orbit-components/lib/';
import { Shopping } from '@kiwicom/orbit-components/icons';
import { GET_MENU } from '../gql';
import { useQuery } from '@apollo/client';
import Loader from 'react-spinners/RingLoader';
import apiUrl from '../conf';
import React from 'react';

export default function Menu(props: any) {
  const { loading, error, data } = useQuery(GET_MENU);

  let orderItems: number[] = [];

  if (loading)
    return (
      <div className="home">
        <Loader size={150} color={'#00A991'} loading={true} />
      </div>
    );

  if (error)
    return (
      <div className="home">
        <h1 style={{ color: 'white' }}>Error</h1>
      </div>
    );

  console.log(data);

  function goToOrder() {
    props.history.push({
      pathname: '/order',
      state: orderItems,
    });
  }

  function addToOrder(id: number) {
    orderItems.push(id);
    console.log(orderItems);
  }

  return (
    <div className="home sr-col">
      <h1 className="sr-menu-title">Menu</h1>
      <Button type="white" onClick={() => goToOrder()}>
        Go to order
      </Button>
      {data.menu.Menu.map((type: Type) => (
        <div key={type.Title}>
          <h2 className="sr-menu-text">{type.Title}</h2>
          <Grid columns="1fr 1fr">
            {type.foods.map((food: Food) => (
              <PictureCard
                key={food.Name}
                title={food.Name}
                image={{
                  name: food.Name,
                  src: `${apiUrl}${food.Image.url}`,
                }}
                subTitle={`${food.Price} €`}
                actions={React.createElement(
                  Button,
                  {
                    iconRight: <Shopping />,
                    type: 'white',
                    onClick: () => addToOrder(food.id),
                  },
                  'Add to Order',
                )}
                height="260px"
                width="400px"
              ></PictureCard>
            ))}
          </Grid>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}

interface Image {
  url: string;
}

interface Food {
  id: number;
  Name: string;
  Price: number;
  Image: Image;
}

interface Type {
  Title: string;
  foods: Food[];
  __typename: string;
}
