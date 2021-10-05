import { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Product } from 'types/product';
import { requestAPI } from 'util/requests';
import './style.css';

type URLParam = {
  productId: string;
};

const Form = () => {
  const history = useHistory();

  const { productId } = useParams<URLParam>();

  const isEditing = productId !== 'create';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>();

  useEffect(() => {
    if (isEditing) {
      requestAPI({ url: `/products/${productId}` }).then((response) => {
        const product = response.data as Product;

        setValue('name', product.name);
        setValue('price', product.price);
        setValue('description', product.description);
        setValue('imgUrl', product.imgUrl);
        setValue('categories', product.categories);
      });
    }
  }, [isEditing, productId, setValue]);

  const onSubmit = (formData: Product) => {
    const data = {
      ...formData,
      imgUrl: isEditing
        ? formData.imgUrl
        : 'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg',
      categories: isEditing ? formData.categories : [{ id: 1, name: '' }],
    };

    const axiosParams: AxiosRequestConfig = {
      method: isEditing ? 'put' : 'post',
      url: isEditing ? `/products/${productId}` : '/products',
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
