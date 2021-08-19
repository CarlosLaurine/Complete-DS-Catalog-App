import './style.css';
import { ReactComponent as ArrowIcon } from 'assets/images/arrow-icon.svg';

type Props = {
  txt: string;
};

const ButtonIcon = ({ txt }: Props) => {
  return (
    <div className="btn-container">
      <button className="btn btn-primary">
        <h5>{txt}</h5>
      </button>
      <div className="btn-icon-container">
        <ArrowIcon />
      </div>
    </div>
  );
};

export default ButtonIcon;
