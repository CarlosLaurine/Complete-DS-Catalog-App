import './style.css';
import { ReactComponent as ArrowIcon } from 'assets/images/arrow-icon.svg';
import ProductPrice from 'components/ProductPrice';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from 'util/requests';
import { Product } from 'types/product';

const ProductDetails = () => {
  let product: Product;

  axios.get(BASE_URL + '/products/1')
  .then(apiresponse => {

    console.log(apiresponse.data);

  })

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
                src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/3-big.jpg"
                alt="Macbook Pro"
              />
            </div>
            <div className="product-name-price-container">
              <h1>Macbook Pro</h1>
              <ProductPrice price={1250.0} />
            </div>
          </div>

          <div className="col-xl-6">
            <div className="product-text-description-container">
              <h2>Product's Description</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                voluptas iure magni nam facilis delectus nobis excepturi optio
                officia dolorum distinctio maxime adipisci alias? Amet nobis ad
                quia vel ut.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
