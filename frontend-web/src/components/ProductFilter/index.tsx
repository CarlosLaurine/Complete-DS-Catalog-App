import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';
import './style.css';

const ProductFilter = () => {
  return (
    <div className="base-card product-filter-container">
      <form action="" className="product-filter-form">
        <div className="product-filter-name-container">
          <input
            type="text"
            className="form-control"
            placeholder="Product Name"
          />
          <SearchIcon />
        </div>
        <div className="product-filter-bottom-container">
          <div className="product-filter-category-container">
            <select name="" id="">
              <option value="">Books</option>
            </select>
          </div>
          <button className="btn btn-outline-secondary">CLEAN</button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
