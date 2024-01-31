import Button from "components/Button";
import Icon from "components/Icon";
import Input from "components/Input";
import Select from "components/Select";
import React, { ChangeEvent, HTMLAttributes, useRef } from "react";
import classnames from "classnames";
import {
  generatePagingOptions,
  getDescription,
  useFigureSmallScreen,
} from "../utils";
import {
  BasePaginationProps,
  ExternalControlProps,
  InternalControlProps,
} from "../TablePagination";

export type AllProps = BasePaginationProps &
  InternalControlProps &
  ExternalControlProps;

export type Props = Omit<
  AllProps,
  "externallyControlled" | "dataForwardProp" | "position"
> &
  HTMLAttributes<HTMLDivElement>;

const TablePaginationControls = ({
  data,
  className,
  itemName,
  description,
  pageLimits,
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  ...divProps
}: Props): JSX.Element => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useFigureSmallScreen({ descriptionRef });

  const totalPages = Math.ceil(totalItems / pageSize);
  const descriptionDisplay = getDescription({
    description,
    data,
    isSmallScreen,
    totalItems,
    itemName,
  });

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

  const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(parseInt(e.target.value));
  };

  return (
    <div
      className={classnames("pagination", className)}
      {...divProps}
      role="navigation"
    >
      <div className="description" ref={descriptionRef}>
        {descriptionDisplay}
      </div>
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
      <Select
        className="items-per-page"
        label="Items per page"
        labelClassName="u-off-screen"
        id="itemsPerPage"
        options={generatePagingOptions(pageLimits)}
        onChange={handlePageSizeChange}
        value={pageSize}
      />
    </div>
  );
};

export default TablePaginationControls;
