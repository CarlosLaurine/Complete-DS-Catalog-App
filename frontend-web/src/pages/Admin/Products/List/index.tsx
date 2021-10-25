import './style.css';
import ProductCardCRUD from 'pages/Admin/Products/ProductCardCRUD';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SpringPage } from 'types/vendor/spring';
import { Product } from 'types/product';
import { AxiosRequestConfig } from 'axios';
import { requestAPI } from 'util/requests';
import Pagbar from 'components/Pagbar';

const List = () => {
  const [springPage, setSpringPage] = useState<SpringPage<Product>>();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    const axiosParams: AxiosRequestConfig = {
      method: 'get',
      url: '/products',
      params: {
        page: 0,
        size: 50,
      },
    };

    requestAPI(axiosParams).then((response) => {
      setSpringPage(response.data);
    });
  };

  return (
    <div className="product-crud-container">
      <div className="product-crud-bar-container">
        <Link to="/admin/products/create">
          <button className="text-white btn btn-primary btn-crud-add">
            ADD
          </button>
        </Link>
        <div className="base-card product-filter-container">Search Bar</div>
      </div>
      <div className="row">
        {springPage?.content.map((product) => {
          return (
            <div className="col-sm-6 col-md-12" key={product.id}>
              <ProductCardCRUD
                product={product}
                onDelete={() => getProducts()}
              />
            </div>
          );
        })}
      </div>
      <Pagbar />
    </div>
  );
};

export default List;
