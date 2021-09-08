import { NavLink } from 'react-router-dom';
import { hasAnyRoles } from 'util/auth';
import './style.css';

const Navbar = () => {
  return (
    <nav className="admin-navbar-container">
      <ul>
        <li>
          <NavLink to="/admin/products" className="admin-navbar-item">
            <p>Products</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories" className="admin-navbar-item">
            <p>Categories</p>
          </NavLink>
        </li>

        {hasAnyRoles(['ROLE_ADMIN']) && (
          <li>
            <NavLink to="/admin/users" className="admin-navbar-item">
              <p>Users</p>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
