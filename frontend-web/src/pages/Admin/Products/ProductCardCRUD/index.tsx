import { AxiosRequestConfig } from 'axios';
import ProductPrice from 'components/ProductPrice';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { requestAPI } from 'util/requests';
import CategoryBadge from '../CategoryBadge';
import './style.css';

type Props = {
  product: Product;
};

const ProductCardCRUD = ({ product }: Props) => {
  const handleDelete = (productId: number) => {

    if(!window.confirm("Are you sure you wish to delete this Item?")){
        return;
    }

    const axiosParams: AxiosRequestConfig = {
      method: 'delete',
      url: `/products/${productId}`,
      withCredentials: true,
    };

    requestAPI(axiosParams).then(() => {
      console.log('Deleted ID => ' + productId);
    });
  };

  return (
    <div className="base-card product-crud-card">
      <div className="product-crud-card-image-container">
        <img src={product.imgUrl} alt={product.name} />
      </div>
      <div className="product-crud-card-description-container">
        <div className="product-crud-card-content-container">
          <h6>{product.name}</h6>
          <ProductPrice price={product.price} />
        </div>
        <div className="product-crud-categories-container">
          {product.categories.map((category) => (
            <CategoryBadge name={category.name} key={category.id} />
          ))}
        </div>
      </div>
      <div className="product-crud-card-buttons-container">
        <button
          className="btn btn-outline-danger product-crud-card-button product-crud-card-button-first"
          onClick={() => handleDelete(product.id)}
        >
          DELETE
        </button>
        <Link to={`/admin/products/${product.id}`}>
          <button className="btn btn-outline-secondary product-crud-card-button">
            EDIT
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCardCRUD;
