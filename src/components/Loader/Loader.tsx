import React from "react";

import Spinner from "../Spinner";
import type { SpinnerProps } from "../Spinner";
import { IS_DEV } from "../../utils";

/**
 * @deprecated Loader component is deprecated. Use Spinner component instead.
 */
const Loader = (props: SpinnerProps): JSX.Element => {
  if (IS_DEV) {
    console.warn(
      "The Loader component has been renamed to Spinner and will be removed in a future release. https://canonical.github.io/react-components/?path=/story/spinner--default-story"
    );
  }
  return <Spinner {...props} />;
};

export default Loader;
