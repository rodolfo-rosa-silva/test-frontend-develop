import { gql } from '@apollo/client';

export const GET_REMIXES = gql`
  query {
    remixes(
      payload: {
        filters: []
        paginate: { skip: 0, take: 10 }
        sorts: [{ columnName: "id", direction: desc }]
      }
    ) {
      items {
        id
        name
        authorEmail
        description
        genre
        isStore
        price
        trackLength
      }
    }
  }
`;

export const CREATE_REMIX = gql`
  mutation ($payload: RemixCreateDTO!) {
    createRemix(payload: $payload) {
      id
      name
      authorEmail
      description
      genre
      isStore
      price
      trackLength
    }
  }
`;

export const UPDATE_REMIX = gql`
  mutation ($payload: RemixUpdateDTO!) {
    updateRemix(payload: $payload) {
      id
      name
      authorEmail
      description
      genre
      isStore
      price
      trackLength
    }
  }
`;

export const DELETE_REMIX = gql`
  mutation ($payload: RemixIdDTO!) {
    deleteRemix(payload: $payload)
  }
`;
