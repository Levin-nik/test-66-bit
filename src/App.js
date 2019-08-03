import React, { Component } from "react";
import { AsyncStorage } from 'react-native';
import { Provider } from "react-redux";

import Nav from "./Navigation/Navigation";
import configureStore from "./Redux/Store/ConfigureStore";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Nav />
      </Provider>
    );
  }
}

export default App;
