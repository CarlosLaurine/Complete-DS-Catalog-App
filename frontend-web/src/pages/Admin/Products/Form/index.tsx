import './style.css';

const Form = () => {
  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">Product Data</h1>

        <form action="">
          <div className="row">
            <div className="col-lg-6">
              <div className="margin-bottom-30">
                <input className="form-control base-input" type="text" />
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
