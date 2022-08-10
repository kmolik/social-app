import {gql} from 'apollo-angular';

const CREATE_USER = gql`
  mutation {
      createUser(userInput: {$email: String!, $name: String!, password: String!}) {
          _id
          email
      }
  }
  `;
