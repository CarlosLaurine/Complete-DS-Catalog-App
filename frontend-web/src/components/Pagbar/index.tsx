import './style.css';
import { ReactComponent as ArrowIcon } from 'assets/images/arrow-icon.svg';

const Pagbar = () => {
  return (
    <div className="pagination-container">
      <ArrowIcon className="arrow-previous arrow-inactive" />
      <div className="pagination-item"> 1 </div>
      <div className="pagination-item active"> 2 </div>
      <div className="pagination-item"> 3 </div>
      <div className="pagination-item"> (...) </div>
      <div className="pagination-item"> 10 </div>
      <ArrowIcon className="arrow-active" />
    </div>
  );
};

export default Pagbar;
