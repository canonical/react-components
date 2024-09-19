import { useId as useIdReact } from "react";

import { IS_DEV } from "utils";

/**
 * @deprecated Code component is deprecated. Use CodeSnippet component or inline `<code>` instead.
 */
export const useId = () => {
  const id = useIdReact();
  if (IS_DEV) {
    console.warn(
      'The useId hook has been deprecated. Use `import { useId } from "react";` instead.',
    );
  }
  return id;
};
