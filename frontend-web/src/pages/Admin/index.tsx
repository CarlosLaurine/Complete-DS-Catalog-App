import './style.css';
import Navbar from './Navbar';
import { Route, Switch } from 'react-router-dom';

const Admin = () => {
  return (
    <>
      <div className="admin-container">
        <Navbar />
        <div className="admin-content">
          <Switch>
            <Route path="/admin/products">
              <h1>Product CRUD</h1>
            </Route>
            <Route path="/admin/categories">
              <h1>Category CRUD</h1>
            </Route>
            <Route path="/admin/users">
              <h1>Users CRUD</h1>
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Admin;
