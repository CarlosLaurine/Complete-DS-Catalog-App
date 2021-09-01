import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import './style.css';

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <div className="login-card base-card">
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            type="text"
            className="base-input form-control"
            placeholder="Email"
            {...register('username')}
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            className="base-input form-control"
            placeholder="Password"
            {...register('password')}
          />
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
