import "./style.css";
import { ReactComponent as ArrowIcon } from 'assets/images/arrow-icon.svg';
import ProductPrice from 'components/ProductPrice';

const ProductDetails = () => {
  return (
    <div className="product-details-container">
      <div className="base-card product-details-card">
        <div className="return-container">
            <ArrowIcon />
            <h1>Return</h1>
        </div>

        <div className="row">
          <div className="col-xl-6">
            <div className="product-image-container">
              <img src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/3-big.jpg" alt="Macbook Pro"/>
            </div>
            <div className="product-name-price-container">
                <h1>Macbook Pro</h1>
                <ProductPrice price={1250.0}/>
            </div>
          </div>

          <div className="col-xl-6">
            <div className="product-text-description-container">
                <h2>Product's Description</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, voluptas iure magni nam facilis delectus nobis excepturi optio officia dolorum distinctio maxime adipisci alias? Amet nobis ad quia vel ut.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
