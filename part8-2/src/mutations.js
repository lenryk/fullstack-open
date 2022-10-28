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
