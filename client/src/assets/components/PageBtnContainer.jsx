import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../../pages/AllJobs";

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();
  const { search, pathname } = useLocation();

  const navigate = useNavigate();
  const handlePageChange = (newPage) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", newPage);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNum, activeClass }) => {
    return (
      <button
        key={pageNum}
        className={`page-btn ${activeClass && "active"}`}
        onClick={() => handlePageChange(pageNum)}
      >
        {pageNum}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    pageButtons.push(
      addPageButton({ pageNum: 1, activeClass: currentPage === 1 })
    );

    if (currentPage > 4) {
      pageButtons.push(
        <span key="dots-1" className="page-btn ">
          ...
        </span>
      );
    }
    if (currentPage > 3 && currentPage < numOfPages) {
      pageButtons.push(
        addPageButton({ pageNum: currentPage - 2, activeClass: false })
      );
    }
    if (currentPage > 2 && currentPage < numOfPages) {
      pageButtons.push(
        addPageButton({ pageNum: currentPage - 1, activeClass: false })
      );
    }

    if (currentPage > 1 && currentPage < numOfPages) {
      pageButtons.push(
        addPageButton({ pageNum: currentPage, activeClass: true })
      );
    }
    if (currentPage < numOfPages - 1 ) {
      pageButtons.push(
        addPageButton({ pageNum: currentPage + 1, activeClass: false })
      );
    }
    if (currentPage === numOfPages && numOfPages > 3) {
      pageButtons.push(
        addPageButton({ pageNum: currentPage - 1, activeClass: false })
      );
    }
    if (currentPage < numOfPages - 2 && currentPage > 1) {
      pageButtons.push(
        addPageButton({ pageNum: currentPage + 2, activeClass: false })
      );
    }
    if (currentPage < numOfPages - 3 ) {
      pageButtons.push(
        <span key="dots-2" className="page-btn ">
          ...
        </span>
      );
    }
    pageButtons.push(
      addPageButton({
        pageNum: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );

    return pageButtons;
  };
  return (
    <Wrapper>
      <button
        className="prev-btn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <HiChevronDoubleLeft />
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="next-btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === numOfPages}
      >
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
