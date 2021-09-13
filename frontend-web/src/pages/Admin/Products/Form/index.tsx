import './style.css';

const Form = () => {
  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">Product Data</h1>

        <form action="">
          <div className="row">
            <div className="col-lg-6">
              <input className="form-control base-input" type="text" />
              <input className="form-control base-input" type="text" />
              <input className="form-control base-input" type="text" />
            </div>
            <div className="col-lg-6">
              <textarea className="form-control base-input" name="" rows={15}></textarea>
            </div>
          </div>

          <div>
            <button className="btn btn-outline-danger">CANCEL</button>
            <button className="btn btn-primary">SAVE</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
