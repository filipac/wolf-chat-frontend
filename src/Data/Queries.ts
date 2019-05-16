import gql from "graphql-tag";

export const GET_CHATS = gql`
  {
    activeChats {
      id
      position {
        lat
        lng
      }
    }
  }
`;

export const CHAT_INFO = gql`
  query getChat($id: Int!) {
    chat(id: $id) {
      id
      position {
        lat
        lng
      }
    }
  }
`;
