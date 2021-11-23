import { gql } from '@apollo/client';

const GET_MENU = gql`
  query Menu {
    menu {
      Menu {
        ... on ComponentFoodTypesAppetizers {
          Title
          foods {
            id
            Name
            Price
            Image {
              url
            }
          }
        }
        ... on ComponentFoodTypesMainCourses {
          Title
          foods {
            id
            Name
            Price
            Image {
              url
            }
          }
        }
        ... on ComponentFoodTypesDeserts {
          Title
          foods {
            id
            Name
            Price
            Image {
              url
            }
          }
        }
        ... on ComponentFoodTypesDrinks {
          Title
          foods {
            id
            Name
            Price
            Image {
              url
            }
          }
        }
      }
    }
  }
`;

export default GET_MENU;
