import './style.css'
const Navbar = () => {
  return (
    <nav className="bg-primary navbar navbar-expand-md main-nav">
      <div className="container-fluid">
        <a href="link" className="nav-text-logo">
          <h4>DS Catalog</h4>
        </a>
        <div className="collapse navbar-collapse">
          <ul className="main-menu navbar-nav offset-md-2">
            <li>
              <a href="link" >HOME</a>
            </li>
            <li>
              <a href="link" className="current">CATALOG</a>
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
