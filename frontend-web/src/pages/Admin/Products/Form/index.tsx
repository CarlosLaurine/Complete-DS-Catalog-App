import './style.css';
import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { Category } from 'types/category';
import { Product } from 'types/product';
import { requestAPI } from 'util/requests';
import { toast } from 'react-toastify';

type URLParam = {
  productId: string;
};

const Form = () => {
  const history = useHistory();

  const { productId } = useParams<URLParam>();

  const isEditing = productId !== 'create';

  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Product>();

  useEffect(() => {
    requestAPI({ url: '/categories' }).then((response) => {
      setSelectCategories(response.data.content);
    });
  }, []);

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
      price: String(formData.price).replace(',', '.'),
    };

    const axiosParams: AxiosRequestConfig = {
      method: isEditing ? 'put' : 'post',
      url: isEditing ? `/products/${productId}` : '/products',
      data,
      withCredentials: true,
    };

    requestAPI(axiosParams)
      .then((response) => {
        toast.success('Product Succesfully Registered!');
        history.push('/admin/products');
      })
      .catch(() => {
        toast.error('Error while Registering the Product');
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
                <Controller
                  name="categories"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={selectCategories}
                      classNamePrefix="product-crud-select"
                      isMulti
                      getOptionLabel={(category: Category) => category.name}
                      getOptionValue={(category: Category) =>
                        String(category.id)
                      }
                    />
                  )}
                />
                {errors.categories && (
                  <div className="invalid-feedback d-block">
                    Mandatory Field
                  </div>
                )}
              </div>

              <div className="margin-bottom-30">
                <Controller
                  name="price"
                  rules={{ required: 'Mandatory Field' }}
                  control={control}
                  render={({ field }) => (
                    <CurrencyInput
                      placeholder="Price"
                      className={`base-input form-control ${
                        errors.name ? 'is-invalid' : ''
                      }`}
                      disableGroupSeparators={true}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <input
                  type="text"
                  className={`base-input form-control ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Product's Image URL"
                  {...register('imgUrl', {
                    required: 'Mandatory Field',
                    pattern: {
                      value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                      message: 'Must be a Valid URL',
                    },
                  })}
                />
                <div className="invalid-feedback d-block">
                  {errors.imgUrl?.message}
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
