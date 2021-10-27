import { AxiosRequestConfig } from 'axios';
import Pagbar from 'components/Pagbar';
import ProductCard from 'components/ProductCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestAPI } from 'util/requests';
import ProductListLoader from './ProductListLoader';
import './style.css';

const Catalog = () => {
  const [springPage, setSpringPage] = useState<SpringPage<Product>>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const axiosParams: AxiosRequestConfig = {
      method: 'get',
      url: '/products',
      params: {
        page: 0,
        size: 12,
      },
    };
    setLoading(true);

    requestAPI(axiosParams)
      .then((response) => {
        setSpringPage(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="my-4 container catalog-container">
        <div className="row catalog-header-container">
          <h1>Product Catalog</h1>
        </div>
        <div className="row">
          {loading ? (
            <ProductListLoader />
          ) : (
            springPage?.content.map((product) => {
              return (
                <div className="col-xl-3 col-lg-4 col-sm-6" key={product.id}>
                  <Link to="/products/1">
                    <ProductCard product={product} />
                  </Link>
                </div>
              );
            })
          )}
        </div>

        <div className="row">
          <Pagbar
            pageCount={springPage ? springPage.totalPages : 0}
            pageRangeDisplayed={3}
          />
        </div>
      </div>
    </>
  );
};

export default Catalog;
