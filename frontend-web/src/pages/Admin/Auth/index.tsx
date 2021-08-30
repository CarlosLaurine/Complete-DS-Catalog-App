import { Route, Switch } from 'react-router-dom';
import { ReactComponent as BannerImg } from 'assets/images/auth-banner-img.svg';

const Auth = () => {
  return (
    <div className="auth-container">
      <div className="auth-banner-container">
        <h1>Publicize your Product on DS Catalog</h1>
        <p>
          Be part of our Promotional Catalog and steadily increase Products'
          Sales.
        </p>
        <BannerImg />
      </div>
      <div className="auth-form-container">
        <Switch>
          <Route path="/admin/auth/login">
            <h1>Login Card</h1>
          </Route>
          <Route path="/admin/auth/signup">
            <h1>Signup Card</h1>
          </Route>
          <Route path="/admin/auth/recover">
            <h1>Recover Card</h1>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Auth;
