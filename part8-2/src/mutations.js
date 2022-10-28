import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation Mutation(
    $title: String!
    $published: Int!
    $genres: [String!]!
    $author: String
  ) {
    addBook(
      title: $title
      published: $published
      genres: $genres
      author: $author
    ) {
      title
      published
      author
      id
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
    }
  }
`;
