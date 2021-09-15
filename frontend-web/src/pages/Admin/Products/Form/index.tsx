import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { Product } from 'types/product';
import { requestAPI } from 'util/requests';
import './style.css';

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const onSubmit = (formData: Product) => {
    const axiosParams: AxiosRequestConfig = {
      method: 'post',
      url: '/products',
      data: formData,
      withCredentials: true,
    };

    requestAPI(axiosParams).then((response) => {
      console.log(response.data);
    });
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
            </div>
            <div className="margin-bottom-30">
              <input className="form-control base-input" type="text" />
            </div>
            <div>
              <input className="form-control base-input" type="text" />
            </div>
          </div>
          <div className="col-lg-6">
            <div>
              <textarea
                className="form-control base-input h-auto"
                name=""
                rows={10}
              />
            </div>
          </div>

          <div className="product-crud-buttons-container">
            <button className="btn btn-outline-danger product-crud-button">
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
