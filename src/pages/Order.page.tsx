import { Stack, InputField, Button } from '@kiwicom/orbit-components/lib/';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../gql';

export default function Order(props: any) {
  const items = props.location.state;
  const [email, setEmail] = useState('');
  const [createOrder] = useMutation(CREATE_ORDER);

  let sanitized: number[] = [];

  items.forEach((item: any) => {
    sanitized.push(parseInt(item));
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
  }

  function back() {
    props.history.goBack();
  }

  return (
    <div className="home">
      <Stack direction="column" align="center">
        <div className="enlarge">
          <InputField label="Your email" type="email" onChange={handleChange} />
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
