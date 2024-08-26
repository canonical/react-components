import Button, { ButtonProps } from "components/Button";
import Icon from "components/Icon";
import Input from "components/Input";
import Select from "components/Select";
import React, { ChangeEvent, HTMLAttributes } from "react";
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

export enum Label {
  NEXT_PAGE = "Next page",
  PREVIOUS_PAGE = "Previous page",
  PAGE_NUMBER = "Page number",
}

export type AllProps = BasePaginationProps &
  InternalControlProps &
  ExternalControlProps;

export type Props = Omit<
  AllProps,
  | "currentPage"
  | "data"
  | "dataForwardProp"
  | "externallyControlled"
  | "onPageChange"
  | "position"
  | "totalItems"
> & {
  currentPage?: AllProps["currentPage"];
  displayDescription?: boolean;
  onInputPageChange?: (page: number) => void;
  nextButtonProps?: Partial<ButtonProps>;
  onNextPage?: (page: number) => void;
  onPageChange?: AllProps["onPageChange"];
  onPreviousPage?: (page: number) => void;
  previousButtonProps?: Partial<ButtonProps>;
  totalItems?: AllProps["totalItems"];
  visibleCount?: number;
  showPageInput?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const TablePaginationControls = ({
  className,
  currentPage,
  description,
  displayDescription = true,
  onInputPageChange,
  itemName,
  nextButtonProps,
  onNextPage,
  onPageChange,
  onPageSizeChange,
  onPreviousPage,
  pageLimits,
  pageSize,
  previousButtonProps,
  showPageInput = true,
  totalItems,
  visibleCount,
  ...divProps
}: Props): JSX.Element => {
  const isSmallScreen = useFigureSmallScreen();

  const totalPages = totalItems ? Math.ceil(totalItems / pageSize) : null;
  const descriptionDisplay = getDescription({
    description,
    visibleCount,
    isSmallScreen,
    totalItems,
    itemName,
  });

  const handleDecrementPage = (currentPage: number) => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
    onPreviousPage?.(typeof currentPage === "number" ? currentPage - 1 : null);
  };

  const handleIncrementPage = (currentPage: number, totalPages: number) => {
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
    }
    onNextPage?.(typeof currentPage === "number" ? currentPage + 1 : null);
  };

  const handleInputPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPage = Math.min(totalPages, Math.max(1, parseInt(e.target.value)));
    onPageChange?.(newPage);
    onInputPageChange?.(Number(e.target.value));
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
      <div className="description" id="pagination-description">
        {displayDescription ? descriptionDisplay : null}
      </div>
      <Button
        aria-label={Label.PREVIOUS_PAGE}
        className="back"
        appearance="base"
        hasIcon
        disabled={currentPage === 1}
        onClick={() => handleDecrementPage(currentPage)}
        {...previousButtonProps}
      >
        {previousButtonProps?.children ? (
          previousButtonProps.children
        ) : (
          <Icon name="chevron-down" />
        )}
      </Button>
      {showPageInput ? (
        <>
          <Input
            id="paginationPageInput"
            label={Label.PAGE_NUMBER}
            labelClassName="u-off-screen"
            className="u-no-margin--bottom pagination-input"
            onChange={handleInputPageChange}
            value={currentPage}
            type="number"
          />{" "}
        </>
      ) : null}
      {typeof totalPages === "number" ? `of ${totalPages}` : null}
      <Button
        aria-label={Label.NEXT_PAGE}
        className="next"
        appearance="base"
        hasIcon
        disabled={currentPage === totalPages}
        onClick={() => handleIncrementPage(currentPage, totalPages)}
        {...nextButtonProps}
      >
        <Icon name="chevron-down" />
      </Button>
      <Select
        className="u-no-margin--bottom"
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
