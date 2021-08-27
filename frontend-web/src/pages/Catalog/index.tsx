import './style.css';
import ProductCard from 'components/ProductCard';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import Pagbar from 'components/Pagbar';
import { useState } from 'react';
import { SpringPage } from 'types/vendor/spring';
import { useEffect } from 'react';
import { AxiosParams } from 'types/vendor/axios';
import { BASE_URL } from 'util/requests';
import axios from 'axios';

const Catalog = () => {

  const [springPage, setSpringPage] = useState<SpringPage<Product>>();

  useEffect(() => {

    const axiosParams : AxiosParams = {

      method: 'GET',
      url : `${BASE_URL}/products`,
      params: {
        page : 0,
        size : 12
      }

    }

    axios(axiosParams)
      .then(response => {
        setSpringPage(response.data);
      })

  }, [])

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
