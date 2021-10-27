import './style.css';
import { ReactComponent as ArrowIcon } from 'assets/images/arrow-icon.svg';
import ReactPaginate from 'react-paginate';

type Props = {
  pageCount: number;
  pageRangeDisplayed: number;
};

const Pagbar = ({ pageCount, pageRangeDisplayed }: Props) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={1}
      containerClassName="pagination-container"
      pageLinkClassName="pagination-item"
      breakClassName="pagination-item"
      previousLabel={<ArrowIcon />}
      previousClassName="arrow-previous"
      nextLabel={<ArrowIcon />}
      nextClassName="arrow-next"
      activeLinkClassName="pagination-link-active"
      disabledClassName="arrow-inactive"
    />
  );
};

export default Pagbar;
