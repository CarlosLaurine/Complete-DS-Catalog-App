import './style.css';

import ProductImage from 'assets/images/product.png';

const ProductCard = () => {
  return (
    <div className="base-card product-card">
      <div className="card-image-container">
        <img src={ProductImage} alt="Product's Name" />
      </div>

      <div className="card-content-container">
        <h6>Product's Name</h6>
        <p>R$2500,75</p>
      </div>
    </div>
  );
};

export default ProductCard;
 