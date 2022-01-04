import { Stack, InputField, Button } from '@kiwicom/orbit-components/lib/';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../gql';
import { store } from 'react-notifications-component';

export default function Order(props: any) {
  const items: Food[] = props.location.state;
  const [email, setEmail] = useState('');
  const [createOrder] = useMutation(CREATE_ORDER);

  let sanitized: number[] = [];

  items.forEach((item: any) => {
    sanitized.push(parseInt(item.id));
  });

  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  function submitOrder() {
    createOrder({
      variables: {
        Table: 'A6',
        foods: sanitized,
        customer: email,
      },
    });

    store.addNotification({
      title: `Order submitted`,
      message: `Thank you for your order`,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000
      }
    });

    setTimeout(() => {
      props.history.push('/');
    }, 1000)
  }

  function back() {
    props.history.goBack();
  }

  return (
    <div className="home">
      <Stack direction="column" align="center">
        <h1 className="sr-menu-title">Order</h1>
        <ul className="sr-order-list">
          {
            items.map((item: Food) => 
              <li className="sr-order-item">{item.Name} - {item.Price} €</li>
            )
          }
        </ul>
        <div className="enlarge">
          <p style={{color: 'white', fontSize: '12pt'}}>Your email</p>
          <InputField type="email" onChange={handleChange} />
        </div>
        <br />
        <Button type="white" onClick={submitOrder}>
          Finish order
        </Button>
        <p className="back" onClick={back}>
          Go back
        </p>
      </Stack>
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