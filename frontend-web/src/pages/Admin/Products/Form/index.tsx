import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Product } from 'types/product';
import { requestAPI } from 'util/requests';
import './style.css';

const Form = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const onSubmit = (formData: Product) => {
    const data = {
      ...formData,
      imgUrl:
        'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg',
      categories: [{ id: 1, name: '' }],
    };

    const axiosParams: AxiosRequestConfig = {
      method: 'post',
      url: '/products',
      data,
      withCredentials: true,
    };

    requestAPI(axiosParams).then((response) => {
      history.push('/admin/products');
    });
  };

  const handleCancel = () => {
    history.push('/admin/products');
  };

  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">Product Data</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6 product-crud-inputs-left-container">
              <div className="margin-bottom-30">
                <input
                  type="text"
                  className={`base-input form-control ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Product Name"
                  {...register('name', {
                    required: 'Mandatory Field',
                  })}
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <input
                  type="text"
                  className={`base-input form-control ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Price"
                  {...register('price', {
                    required: 'Mandatory Field',
                  })}
                />
                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div>
                <textarea
                  rows={10}
                  className={`base-input form-control h-auto ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Description"
                  {...register('description', {
                    required: 'Mandatory Field',
                  })}
                />
                <div className="invalid-feedback d-block">
                  {errors.description?.message}
                </div>
              </div>
            </div>
          </div>

          <div className="product-crud-buttons-container">
            <button
              onClick={handleCancel}
              className="btn btn-outline-danger product-crud-button"
            >
              CANCEL
            </button>
            <button className="btn btn-primary product-crud-button text-white">
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
