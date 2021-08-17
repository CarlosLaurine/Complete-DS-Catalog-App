import ProductCard from 'components/ProductCard';

const Catalog = () => {
  return (
    <>
      <div className="my-4 container">
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <ProductCard />
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <ProductCard />
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <ProductCard />
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <ProductCard />
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <ProductCard />
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <ProductCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
