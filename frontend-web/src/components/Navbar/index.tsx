import './style.css';
import 'bootstrap/js/src/collapse.js';

const Navbar = () => {
  return (
    <nav className="bg-primary navbar navbar-dark navbar-expand-md main-nav">
      <div className="container-fluid">
        <a href="link" className="nav-text-logo">
          <h4>DS Catalog</h4>
        </a>

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
              <a href="link">HOME</a>
            </li>
            <li>
              <a href="link" className="current">
                CATALOG
              </a>
            </li>
            <li>
              <a href="link">ADMIN</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
