import Button from "components/Button";
import Icon from "components/Icon";
import Input from "components/Input";
import React, { ChangeEvent } from "react";

export type Props = {
  /**
   * Callback function to handle a change in page number
   */
  onPageChange: (pageNumber: number) => void;
  /**
   * The current page of the data
   */
  currentPage: number;
  /**
   * The total number of pages that exists within the data
   */
  totalPages: number;
};

const TablePaginationControls = ({
  onPageChange,
  currentPage,
  totalPages,
}: Props): JSX.Element => {
  const handleDecrementPage = (currentPage: number) => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleIncrementPage = (currentPage: number, totalPages: number) => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleInputPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPage = Math.min(totalPages, Math.max(1, parseInt(e.target.value)));
    onPageChange(newPage);
  };

  return (
    <>
      <Button
        aria-label="Previous page"
        className="back"
        appearance="base"
        hasIcon
        disabled={currentPage === 1}
        onClick={() => handleDecrementPage(currentPage)}
      >
        <Icon name="chevron-down" />
      </Button>
      <Input
        id="paginationPageInput"
        label="Page number"
        labelClassName="u-off-screen"
        className="u-no-margin--bottom pagination-input"
        onChange={handleInputPageChange}
        value={currentPage}
        type="number"
      />{" "}
      of&nbsp;{totalPages}
      <Button
        aria-label="Next page"
        className="next"
        appearance="base"
        hasIcon
        disabled={currentPage === totalPages}
        onClick={() => handleIncrementPage(currentPage, totalPages)}
      >
        <Icon name="chevron-down" />
      </Button>
    </>
  );
};

export default TablePaginationControls;
