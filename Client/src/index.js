import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {store} from "./data/store";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from 'redux-persist/integration/react'
import UploadFile from "./components/UploadFile";
import "bootstrap/dist/css/bootstrap.min.css";
import FilesList from "./components/FilesList";
import './styles.scss';
import UploadDisplayer from "./components/UploadDisplayer";


let persistor = persistStore(store)
ReactDOM.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App/>
      </PersistGate>
    </Provider>
  </>,
  document.getElementById("root")
);