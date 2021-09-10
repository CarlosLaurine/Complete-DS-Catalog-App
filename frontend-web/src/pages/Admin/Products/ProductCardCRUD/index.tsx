import './style.css';

import ProductPrice from 'components/ProductPrice';
import { Product } from 'types/product';
import CategoryBadge from '../CategoryBadge';

type Props = {
  product: Product;
};

const ProductCardCRUD = ({ product }: Props) => {
  return (
    <div className="base-card product-crud-card">
      <div className="product-crud-card-image-container">
        <img src={product.imgUrl} alt={product.name} />
      </div>

      <div className="product-crud-card-content-container">
        <h6>{product.name}</h6>
        <ProductPrice price={product.price} />
      </div>
      <div className="product-crud-categories-container">
        <CategoryBadge />
        <CategoryBadge />
      </div>
    </div>
  );
};

export default ProductCardCRUD;
