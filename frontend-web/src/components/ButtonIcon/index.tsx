import './style.css';
import { ReactComponent as ArrowIcon } from 'assets/images/arrow-icon.svg';

const ButtonIcon = () => {
  return (
    <div className="btn-container">
      <button className="btn btn-primary">
        <h5>Start your Search now!</h5>
      </button>
      <div className="btn-icon-container">
        <ArrowIcon/>
      </div>
    </div>
  );
};

export default ButtonIcon;
