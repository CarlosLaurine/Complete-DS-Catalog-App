import './style.css';
import ContentLoader from 'react-content-loader';

const ProductListLoader = () => (
  <div className="product-card-loader-container">
    <ContentLoader
      speed={2}
      width={320}
      height={460}
      viewBox="0 0 400 460"
      backgroundColor="#ecebebeb"
      foregroundColor="#d6d2d2d2"
    >
      <rect x="2" y="20" rx="2" ry="2" width="300" height="10" />
      <rect x="2" y="36" rx="2" ry="2" width="300" height="10" />
      <rect x="0" y="0" rx="2" ry="2" width="300" height="300" />
    </ContentLoader>
  </div>
);

export default ProductListLoader;
