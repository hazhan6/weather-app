import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/storeConfig/store.js";
import Card from "./Card.js";

function App() {
  return (
    <Provider store={store}>
      <Card />
    </Provider>
  );
}

export default App;