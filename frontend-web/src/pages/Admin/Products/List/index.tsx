import { AxiosRequestConfig } from 'axios';
import Pagbar from 'components/Pagbar';
import ProductCardCRUD from 'pages/Admin/Products/ProductCardCRUD';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestAPI } from 'util/requests';
import './style.css';

const List = () => {
  const [springPage, setSpringPage] = useState<SpringPage<Product>>();

  useEffect(() => {
    getProducts(0);
  }, []);

  const getProducts = (pageNumber: number) => {
    const axiosParams: AxiosRequestConfig = {
      method: 'get',
      url: '/products',
      params: {
        page: pageNumber,
        size: 3,
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
                onDelete={() => getProducts(springPage.number)}
              />
            </div>
          );
        })}
      </div>
      <Pagbar
        pageCount={springPage ? springPage.totalPages : 0}
        pageRangeDisplayed={3}
        onChange={getProducts}
      />
    </div>
  );
};

export default List;
