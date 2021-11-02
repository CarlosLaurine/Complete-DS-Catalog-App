import { AxiosRequestConfig } from 'axios';
import Pagbar from 'components/Pagbar';
import ProductFilter from 'components/ProductFilter';
import ProductCardCRUD from 'pages/Admin/Products/ProductCardCRUD';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestAPI } from 'util/requests';
import './style.css';

type ControlComponentsData = {
  activePage: number;
};
const List = () => {
  const [springPage, setSpringPage] = useState<SpringPage<Product>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({ activePage: pageNumber });
  };

  const getProducts = useCallback(() => {
    const axiosParams: AxiosRequestConfig = {
      method: 'get',
      url: '/products',
      params: {
        page: controlComponentsData.activePage,
        size: 3,
      },
    };
    requestAPI(axiosParams).then((response) => {
      setSpringPage(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="product-crud-container">
      <div className="product-crud-bar-container">
        <Link to="/admin/products/create">
          <button className="text-white btn btn-primary btn-crud-add">
            ADD
          </button>
        </Link>
        <ProductFilter />
      </div>
      <div className="row">
        {springPage?.content.map((product) => {
          return (
            <div className="col-sm-6 col-md-12" key={product.id}>
              <ProductCardCRUD product={product} onDelete={getProducts} />
            </div>
          );
        })}
      </div>
      <Pagbar
        pageCount={springPage ? springPage.totalPages : 0}
        pageRangeDisplayed={3}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default List;
