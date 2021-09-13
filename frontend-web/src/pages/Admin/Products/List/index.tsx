import './style.css';
import ProductCardCRUD from 'pages/Admin/Products/ProductCardCRUD';
import { Link } from 'react-router-dom';

const List = () => {
  const defaultProduct = {
    id: 2,
    name: 'Smart TV',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 2190.0,
    imgUrl:
      'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg',
    date: '2020-07-14T10:00:00Z',
    categories: [
      {
        id: 1,
        name: 'Books',
      },
      {
        id: 3,
        name: 'Computers',
      },
    ],
  };

  return (
    <>
      <div className="product-crud-bar-container">
        <Link to="/admin/products/create">
          <button className="text-white btn btn-primary btn-crud-add">
            ADD
          </button>
        </Link>
        <div className="base-card product-filter-container">Search Bar</div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-md-12">
          <ProductCardCRUD product={defaultProduct} />
        </div>
        <div className="col-sm-6 col-md-12">
          <ProductCardCRUD product={defaultProduct} />
        </div>
        <div className="col-sm-6 col-md-12">
          <ProductCardCRUD product={defaultProduct} />
        </div>
        <div className="col-sm-6 col-md-12">
          <ProductCardCRUD product={defaultProduct} />
        </div>
      </div>
    </>
  );
};

export default List;
