import { gql } from '@apollo/client';

const CREATE_ORDER = gql`
  mutation Order($Table: String, $foods: [ID], $customer: String) {
    createOrder(
      input: { data: { Table: $Table, foods: $foods, customer: $customer } }
    ) {
      order {
        id
      }
    }
  }
`;

export default CREATE_ORDER;
