import './style.css';
import ProductCard from 'components/ProductCard';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import Pagbar from 'components/Pagbar';

const Catalog = () => {
  const product: Product = {
    id: 3,
    name: 'Macbook Pro',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 1250.0,
    imgUrl:
      'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/3-big.jpg',
    date: '2020-07-14T10:00:00Z',
    categories: [
      {
        id: 3,
        name: 'Computers',
      },
    ],
  };

  return (
    <>
      <div className="my-4 container catalog-container">
        <div className="row catalog-header-container">
          <h1>Product Catalog</h1>
        </div>
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <Link to="/products/1">
              <ProductCard product={product} />
            </Link>
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <Link to="/products/1">
              <ProductCard product={product} />
            </Link>
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <Link to="/products/1">
              <ProductCard product={product} />
            </Link>
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <Link to="/products/1">
              <ProductCard product={product} />
            </Link>
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <Link to="/products/1">
              <ProductCard product={product} />
            </Link>
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <Link to="/products/1">
              <ProductCard product={product} />
            </Link>
          </div>
        </div>

        <div className="row">
          <Pagbar />
        </div>
      </div>
    </>
  );
};

export default Catalog;
