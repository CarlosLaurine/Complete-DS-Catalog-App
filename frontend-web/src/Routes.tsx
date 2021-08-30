import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import Catalog from 'pages/Catalog';
import Admin from 'pages/Admin';
import ProductDetails from 'pages/ProductDetails';
import Auth from 'pages/Admin/Auth';

const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products">
          <Catalog />
        </Route>
        <Redirect from="/admin" to="/admin/products" exact />
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route path="/products/:productId">
          <ProductDetails />
        </Route>
        <Redirect exact from="/admin/auth" to="/admin/auth/login" />
        <Route path="/admin/auth">
          <Auth />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
