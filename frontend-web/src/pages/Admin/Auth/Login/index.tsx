import './style.css';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { requestAPILogin, saveAuthData } from 'util/requests';
import { useState } from 'react';

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [hasError, setHasError] = useState(false);

  const onSubmit = (formData: FormData) => {
    requestAPILogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setHasError(false);
        console.log('Success => ', response);
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
