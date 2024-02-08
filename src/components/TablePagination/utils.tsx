import {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  useEffect,
  useState,
} from "react";

/**
 * Determine if we are working with a small screen.
 * 'small screen' in this case is relative to the width of the description div
 */
export const figureSmallScreen = () => {
  const descriptionElement = document.getElementById("pagination-description");
  if (!descriptionElement) {
    return true;
  }
  return descriptionElement.getBoundingClientRect().width < 230;
};

/**
 * Iterate direct react child components and override the value of the prop specified by @param dataForwardProp
 * for those child components.
 * @param children - react node children to iterate
 * @param dataForwardProp - the name of the prop from the children components to override
 * @param data - actual data to be passed to the prop specified by @param dataForwardProp
 */
export const renderChildren = (
  children: ReactNode,
  dataForwardProp: string,
  data: unknown[]
) => {
  return Children.map(children, (child) => {
    return cloneElement(child as ReactElement, {
      [dataForwardProp]: data,
    });
  });
};

export const DEFAULT_PAGE_LIMITS = [50, 100, 200];
export const generatePagingOptions = (pageLimits: number[]) => {
  return pageLimits.map((limit) => ({ value: limit, label: `${limit}/page` }));
};

export const getDescription = ({
  description,
  data,
  isSmallScreen,
  totalItems,
  itemName,
}: {
  description: ReactNode;
  data: unknown[];
  isSmallScreen: boolean;
  totalItems: number;
  itemName: string;
}) => {
  if (description) {
    return description;
  }

  const visibleCount = data.length;

  if (isSmallScreen) {
    return `${visibleCount} out of ${totalItems}`;
  }

  if (visibleCount === totalItems && visibleCount > 1) {
    return `Showing all ${totalItems} ${itemName}s`;
  }

  return `Showing ${visibleCount} out of ${totalItems} ${itemName}${
    totalItems !== 1 ? "s" : ""
  }`;
};

export const useFigureSmallScreen = () => {
  const [isSmallScreen, setSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(figureSmallScreen());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isSmallScreen;
};
