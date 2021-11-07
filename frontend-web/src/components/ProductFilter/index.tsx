import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Category } from 'types/category';
import { requestAPI } from 'util/requests';
import './style.css';

type ProductFilterData = {
  name: string;
  category: Category | null;
};

const ProductFilter = () => {
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const { register, handleSubmit, control, getValues, setValue } =
    useForm<ProductFilterData>();

  const onSubmit = (formData: ProductFilterData) => {
    console.log('SENT', formData);
  };

  const handleClearForm = () => {
    setValue('name', '');
    setValue('category', null);
  };

  const hadleCategoryChange = (value: Category) => {
    setValue('category', value);

    const formObj: ProductFilterData = {
      name: getValues('name'),
      category: getValues('category'),
    };

    console.log('SENT', formObj);
  };

  useEffect(() => {
    requestAPI({ url: '/categories' }).then((response) => {
      setSelectCategories(response.data.content);
    });
  }, []);

  return (
    <div className="base-card product-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="product-filter-form">
        <div className="product-filter-name-container">
          <input
            type="text"
            className="form-control"
            placeholder="Product Name"
            {...register('name')}
            name="name"
          />
          <button className="product-filter-search-icon">
            <SearchIcon />
          </button>
        </div>
        <div className="product-filter-bottom-container">
          <div className="product-filter-category-container">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectCategories}
                  classNamePrefix="product-filter-select"
                  placeholder="Category"
                  isClearable
                  getOptionLabel={(category: Category) => category.name}
                  getOptionValue={(category: Category) => String(category.id)}
                  onChange={(value) => hadleCategoryChange(value as Category)}
                />
              )}
            />
          </div>
          <button
            className="btn btn-outline-secondary btn-product-filter-clean"
            onClick={handleClearForm}
          >
            CLEAN <span className="btn-product-filter-expression">FILTER</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
