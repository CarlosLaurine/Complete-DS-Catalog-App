import './style.css';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { useContext, useState } from 'react';
import { AuthContext } from 'AuthContext';
import { requestAPILogin } from 'util/requests';
import { getTokenData } from 'util/auth';
import { getAuthData, saveAuthData } from 'util/auth-storage';

type CredentialsDTO = {
  username: string;
  password: string;
};

type LocationState = {
  from: string;
};

const Login = () => {
  const location = useLocation<LocationState>();

  const { from } = location.state || { from: { pathname: '/admin' } };

  const { authContextData, setAuthContextData } = useContext(AuthContext);

  const {register, handleSubmit, formState: { errors }} = useForm<CredentialsDTO>();

  const [hasError, setHasError] = useState(false);

  const history = useHistory();

  const onSubmit = (formData: CredentialsDTO) => {
    requestAPILogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        const authToken = getAuthData().access_token;
        console.log('Generated Token => ' + authToken);
        setHasError(false);
        console.log('Success => ', response);
        setAuthContextData({
          isAuthenticated: true,
          tokenData: getTokenData(),
        });
        history.replace(from);
      })
      .catch((error) => {
        setHasError(true);
        console.log('Error => ', error);
      });
  };

  return (
    <div className="login-card base-card">
      <h1>LOGIN</h1>
      {hasError && (
        <div className="alert alert-danger" role="alert">
          A Login Error Occurred
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            type="text"
            className={`base-input form-control ${
              errors.username ? 'is-invalid' : ''
            }`}
            placeholder="Email"
            {...register('username', {
              required: 'Mandatory Field',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid Email',
              },
            })}
          />
          <div className="invalid-feedback d-block">
            {errors.username?.message}
          </div>
        </div>

        <div className="mb-2">
          <input
            type="password"
            className={`base-input form-control ${
              errors.password ? 'is-invalid' : ''
            }`}
            placeholder="Password"
            {...register('password', {
              required: 'Mandatory Field',
            })}
          />
          <div className="invalid-feedback d-block">
            {errors.password?.message}
          </div>
        </div>

        <Link to="/admin/auth/recover" className="login-link-recover">
          Forgot Password
        </Link>
        <div className="login-submit">
          <ButtonIcon txt="LOGIN" />
        </div>
        <div className="signup-container">
          <span className="not-registered">Not Registered?</span>
          <Link to="/admin/auth/register" className="login-link-register">
            Sign-Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
