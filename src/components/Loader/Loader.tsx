import React from "react";

import Spinner from "../Spinner";
import { IS_DEV } from "../../utils";

const Loader = (props) => {
  if (IS_DEV) {
    console.warn(
      "The Loader component has been renamed to Spinner and will be removed in a future release. https://canonical-web-and-design.github.io/react-components/?path=/story/spinner--default-story"
    );
  }
  return <Spinner {...props} />;
};

export default Loader;
