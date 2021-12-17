import React from "react";
import './App.css';
import { Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import  SignInPage  from "./pages/SignInPage/SignInPage";
import { ThemeProvider } from '@material-ui/core'
import { theme } from './theme';
import { SupplierView } from "./pages/SupplierView/SupplierView";
import { HOME_PAGE_URL, MY_ORDERS_VIEW_URL, SUPPLIERS_VIEW_URL, SIGN_IN_PAGE_URL, SUPPLIER_VIEW_URL, TABLES_VIEW_URL, WALLET_VIEW_URL } from './utils/urlProvider';
import { TablesView } from "./pages/TablesView/TablesView";
import OrdersView from "./pages/OrdersView/OrdersView";
import {WalletView} from "./pages/WalletView/WalletView";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path = {HOME_PAGE_URL} component = {HomePage} />
          <Route exact path = {SIGN_IN_PAGE_URL} component = {SignInPage} />
          <Route exat path={ WALLET_VIEW_URL } component={WalletView} />
          <Route exat path={ [SUPPLIERS_VIEW_URL, SUPPLIER_VIEW_URL] } component={SupplierView} />
          <Route exat path={ TABLES_VIEW_URL } component={TablesView} />
          <Route exat path={ MY_ORDERS_VIEW_URL } component={OrdersView} />
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
