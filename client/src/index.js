import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import store from './store';
import {Provider as AlertProvider,positions,transitions} from 'react-alert'
import AlertTemplate from "react-alert-template-basic"
import MenuProvider from "react-flexible-sliding-menu"
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';

const options = {
  position:positions.BOTTOM_CENTER,
  timeout:4000,
  transition:transitions.SCALE
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <MenuProvider MenuComponent={Sidebar} animation='push'>
            <App/>
          </MenuProvider>
        </BrowserRouter>
      </AlertProvider>
    </Provider>
  //</React.StrictMode>
);
