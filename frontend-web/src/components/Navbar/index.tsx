import './style.css';
import 'bootstrap/js/src/collapse.js';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
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
              <NavLink to="/" activeClassName = "active" exact>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" activeClassName = "active">
                CATALOG
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeClassName = "active">
                ADMIN
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
