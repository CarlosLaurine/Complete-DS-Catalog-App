import ButtonIcon from 'components/ButtonIcon';
import { Link } from 'react-router-dom';

import './style.css';

const Login = () => {
  return (
    <div className="login-card base-card">
      <h1>LOGIN</h1>
      <form>
        <div className="mb-4">
          <input
            type="text"
            className="base-input form-control"
            placeholder="Email"
            name="username"
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            className="base-input form-control"
            placeholder="Password"
            name="password"
          />
        </div>
        <Link to="/admin/auth/recover" className="login-link-recover">
          Forgot Password
        </Link>
        <div className="login-submit">
          <ButtonIcon txt="LOGIN" />
        </div>
        <div className="signup-container">
          <span className="not-registered">Don't Have a Login?</span>
          <Link to="/admin/auth/register" className="login-link-register">
            Sign-Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
