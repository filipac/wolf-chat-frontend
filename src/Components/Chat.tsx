import React, { Props } from "react";
import { MainContext, MainContextType } from "../App";
import { match } from "react-router";
import { History, Location } from "history";
import { Query } from "react-apollo";
import { CHAT_INFO } from "../Data";

interface ChatMatch {
  id: string;
}
interface ChatProps {
  history: History;
  location: Location;
  match: match<ChatMatch>;
}

export class Chat extends React.PureComponent<ChatProps> {
  render() {
    return (
      <MainContext.Consumer>
        {(value: MainContextType) => {
          if (value.setActive !== undefined) {
            setTimeout(() => {
              if (value.setActive !== undefined)
                value.setActive(this.props.match.params.id);
            }, 1);
          }
          return (
            <Query
              query={CHAT_INFO}
              variables={{ id: this.props.match.params.id }}
              fetchPolicy="cache-and-network"
            >
              {(data: any) => {
                if (data.loading && !data.data.chat) return "Loading...";
                if (data.error) return `Error! ${data.error.message}`;

                console.log(data);
                return <pre>{JSON.stringify(data.data.chat, null, 2)}</pre>;
              }}
            </Query>
          );
        }}
      </MainContext.Consumer>
    );
  }
}
