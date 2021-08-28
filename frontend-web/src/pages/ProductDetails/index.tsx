import './style.css';
import { ReactComponent as ArrowIcon } from 'assets/images/arrow-icon.svg';
import ProductPrice from 'components/ProductPrice';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from 'util/requests';
import { Product } from 'types/product';
import { useState, useEffect } from 'react';
import ProductInfoLoader from './ProductInfoLoader';
import ProductDescriptionLoader from './ProductDescriptionLoader';

type URLParam = {
  productId: string;
};

const ProductDetails = () => {
  const { productId } = useParams<URLParam>();

  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/products/${productId}`)
      .then((apiresponse) => {
        setProduct(apiresponse.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

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
            {loading ? (
              <ProductInfoLoader />
            ) : (
              <>
                <div className="product-image-container">
                  <img src={product?.imgUrl} alt={product?.name} />
                </div>
                <div className="product-name-price-container">
                  <h1>{product?.name}</h1>
                  {product && <ProductPrice price={product?.price} />}
                </div>
              </>
            )}
          </div>

          <div className="col-xl-6">
            {loading ? (
              <ProductDescriptionLoader />
            ) : (
              <div className="product-text-description-container">
                <h2>Product's Description</h2>
                <p>{product?.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
