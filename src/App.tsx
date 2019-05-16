import React, { useState, Fragment } from "react";
import "./index.css";
import { RouterView, Map } from "./Components";
import { createBrowserHistory } from "history";
import { Router } from "react-router";
import { setupClient } from "./Data";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

// const position: LatLngExpression = [51.505, -0.09];

const history = createBrowserHistory();

export interface MainContextType {
  active?: any;
  setActive?: CallableFunction;
  setup: Boolean;
}

export const MainContext = React.createContext<MainContextType>({
  setup: false
});

class App extends React.PureComponent {
  readonly state = {
    active: null,
    client: null,
    setup: false
  };

  async componentDidMount() {
    const client = await setupClient();
    await this.setState({ client, setup: true });
  }

  setActive = (id: any) => {
    this.setState({ active: id });
  };

  getValue = () => {
    return {
      active: this.state.active,
      setActive: this.setActive,
      setup: this.state.setup
    };
  };

  render() {
    if (this.state.client === null) {
      return <></>;
    }
    return (
      // @ts-ignore
      <ApolloProvider client={this.state.client}>
        <MainContext.Provider value={this.getValue()}>
          <Router history={history}>
            <div className="App h-screen bg-blue-900">
              <Map history={history} />
              <RouterView />
            </div>
          </Router>
        </MainContext.Provider>
      </ApolloProvider>
    );
  }
}

export default App;
