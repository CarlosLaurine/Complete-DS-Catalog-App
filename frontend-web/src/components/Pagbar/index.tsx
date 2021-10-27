import { ReactComponent as ArrowIcon } from 'assets/images/arrow-icon.svg';
import ReactPaginate from 'react-paginate';
import './style.css';

type Props = {
  pageCount: number;
  pageRangeDisplayed: number;
  onChange?: (pageNumber: number) => void;
};

const Pagbar = ({ pageCount, pageRangeDisplayed, onChange }: Props) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={1}
      containerClassName="pagination-container"
      pageLinkClassName="pagination-item"
      breakClassName="pagination-item"
      previousLabel={
        <div className="pagination-arrow-container">
          <ArrowIcon />
        </div>
      }
      previousClassName="arrow-previous"
      nextLabel={
        <div className="pagination-arrow-container">
          <ArrowIcon />
        </div>
      }
      nextClassName="arrow-next"
      activeLinkClassName="pagination-link-active"
      disabledClassName="arrow-inactive"
      onPageChange={(items) => (onChange ? onChange(items.selected) : {})}
    />
  );
};

export default Pagbar;
