import './style.css';

import ProductPrice from 'components/ProductPrice';
import { Product } from 'types/product';

type Props = {
  product: Product;
};

const ProductCardCRUD = ({ product }: Props) => {
  return (
    <div className="base-card product-card">
      <div className="card-image-container">
        <img src={product.imgUrl} alt={product.name} />
      </div>

      <div className="card-content-container">
        <h6>{product.name}</h6>
        <ProductPrice price={product.price} />
      </div>
    </div>
  );
};

export default ProductCardCRUD;
