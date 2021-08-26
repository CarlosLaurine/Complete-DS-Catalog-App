import './style.css';
import { ReactComponent as ArrowIcon } from 'assets/images/arrow-icon.svg';
import ProductPrice from 'components/ProductPrice';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from 'util/requests';
import { Product } from 'types/product';
import { useState, useEffect } from 'react';

const ProductDetails = () => {
  
  const [product, setProduct] = useState<Product>();

  useEffect( () => {
    
  axios.get(BASE_URL + '/products/1')
  .then(apiresponse => {

    setProduct(apiresponse.data)

  })
  }, [])

  return (
    <div className="product-details-container">
      <div className="base-card product-details-card">
        <Link to="/products">
          <div className="return-container">
            <ArrowIcon />
            <h1>Return</h1>
          </div>
        </Link>

        <div className="row">
          <div className="col-xl-6">
            <div className="product-image-container">
              <img
                src={product?.imgUrl}
                alt={product?.name}
              />
            </div>
            <div className="product-name-price-container">
              <h1>{product?.name}</h1>
              {product && <ProductPrice price={product?.price} />}
            </div>
          </div>

          <div className="col-xl-6">
            <div className="product-text-description-container">
              <h2>Product's Description</h2>
              <p>
                {product?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
