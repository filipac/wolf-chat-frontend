import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Link, match } from "react-router-dom";
import { MapContext } from "./Map";
import { MainContext, MainContextType } from "../App";
import { Chat } from "./Chat";

function Index(props: any) {
  console.log(props);
  return (
    <MainContext.Consumer>
      {(value: MainContextType) => {
        if (value.setup) {
          setTimeout(() => {
            if (value.setActive !== undefined) value.setActive(null);
          }, 1);
        }
        return <h2>Select a marker first</h2>;
      }}
    </MainContext.Consumer>
  );
}

export class RouterView extends React.PureComponent {
  render() {
    return (
      <div
        className="absolute h-full w-1/4"
        style={{
          top: 0,
          right: 100,
          zIndex: 10000
        }}
      >
        <div
          className="bg-white min-w-full"
          style={{
            marginTop: 30,
            marginBottom: 30,
            height: "90%"
          }}
        >
          <div>
            <Route path="/" exact component={Index} />
            <Route path="/chat/:id" component={Chat} />
          </div>
        </div>
      </div>
    );
  }
}
