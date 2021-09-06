import './style.css';
import 'bootstrap/js/src/collapse.js';
import { Link, NavLink } from 'react-router-dom';
import { getTokenData, isAuthenticated, removeAuthData } from 'util/requests';
import { useEffect } from 'react';
import history from 'util/history';
import { useContext } from 'react';
import { AuthContext } from 'AuthContext';

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        isAuthenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        isAuthenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleClickLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      isAuthenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="bg-primary navbar navbar-dark navbar-expand-md main-nav">
      <div className="container-fluid">
        <Link to="/" className="nav-text-logo">
          <h4>DS Catalog</h4>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#dscatalog-navbar"
          aria-controls="dscatalog-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="dscatalog-navbar" className="collapse navbar-collapse">
          <ul className="main-menu navbar-nav offset-md-2">
            <li>
              <NavLink to="/" activeClassName="current" exact>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" activeClassName="current">
                CATALOG
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeClassName="current">
                ADMIN
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-login-logout">
          {authContextData.isAuthenticated ? (
            <>
              <span className="nav-logged-username">
                {authContextData.tokenData?.user_name}
              </span>
              <a href="#logout" onClick={handleClickLogout}>
                Log Out
              </a>
            </>
          ) : (
            <Link to="/admin/auth">Log In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
