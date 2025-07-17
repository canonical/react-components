import React from "react";
import classnames from "classnames";
import { FC, PropsWithChildren, ReactNode } from "react";
import { createPortal } from "react-dom";
import Content, { type ContentProps } from "./common/Content";
import Footer, { type FooterProps } from "./common/Footer";
import Header, { type HeaderProps } from "./common/Header";
import HeaderControls, {
  type HeaderControlsProps,
} from "./common/HeaderControls";
import HeaderTitle, { type HeaderTitleProps } from "./common/HeaderTitle";
import Sticky, { type StickyProps } from "./common/Sticky";
import AppAside from "../ApplicationLayout/AppAside";
import Spinner from "../Spinner";
import "./SidePanel.scss";

/**
 * The props for the SidePanelComponent component.
 */
export type Props = {
  /**
   * The content of the side panel.
   */
  children: ReactNode;

  /**
   * Additional CSS classes to apply.
   */
  className?: string;

  /**
   * Whether the side panel has an error. This will show an error message in the panel instead of rendering the children.
   */
  hasError?: boolean;

  /**
   * Whether the side panel is currently loading. This will show a spinner in the panel instead of rendering the children.
   */
  loading?: boolean;

  /**
   * Whether the side panel is an overlay with background or should allow seeing the content below it.
   */
  overlay?: boolean;

  /**
   * The ID of the parent element to which the side panel will be appended
   */
  parentId?: string;

  /**
   * Whether the side panel should be pinned. When pinned, it will remain visible alongside the main content.
   */
  pinned?: boolean;

  /**
   * Whether the side panel should be wide.
   */
  wide?: boolean;
};

/**
This is a [React](https://reactjs.org/) component for the Vanilla application layout [Side Panel](https://vanillaframework.io/docs/layouts/application#panels).

The sidepanel component should be used to show additional information relating to the main content on the page. It is using a composable structure with building blocks:

* **SidePanel.Header:** Defines the header of the side panel, which can include a title and controls.

* **SidePanel.HeaderTitle:** To show the title of the side panel as heading.

* **SidePanel.HeaderControls:** To show controls in the header, such as buttons or icons for actions like closing the panel.

* **SidePanel.Sticky:** Can be wrapped around the header or footer to make them sticky when scrolling.

* **SidePanel.Content:** To show the main content of the side panel.

* **SidePanel.Footer:** To show additional information or actions at the bottom of the side panel.

## Example

Usage of the composable structure:

```jsx
<SidePanel className="u-no-padding--top u-no-padding--bottom">
  <SidePanel.Sticky>
    <SidePanel.Header>
      <SidePanel.HeaderTitle>Edit panel</SidePanel.HeaderTitle>
    </SidePanel.Header>
  </SidePanel.Sticky>
  <SidePanel.Content className="u-no-padding">
    <p>Here be dragons!</p>
  </SidePanel.Content>
  <SidePanel.Sticky position="bottom">
    <SidePanel.Footer className="u-align--right">
      <Button appearance="base">Cancel</Button>
      <ActionButton appearance="positive">Save changes</ActionButton>
    </SidePanel.Footer>
  </SidePanel.Sticky>
</SidePanel>
```
*/
const SidePanelComponent = ({
  children,
  className,
  hasError = false,
  loading = false,
  overlay,
  pinned,
  wide,
  parentId = "l-application",
}: Props): React.JSX.Element => {
  const container = document.getElementById(parentId) || document.body;

  return (
    <>
      {createPortal(
        <AppAside
          className={classnames("side-panel", className, {
            "is-overlay": overlay,
          })}
          aria-label="Side panel"
          pinned={pinned}
          narrow={!wide}
          wide={wide}
        >
          {loading ? (
            <div className="loading">
              <Spinner />
            </div>
          ) : hasError ? (
            <div className="error">Loading failed</div>
          ) : (
            children
          )}
        </AppAside>,
        container,
      )}
    </>
  );
};

type SidePanelComponents = FC<Props> & {
  Header: FC<PropsWithChildren & HeaderProps>;
  HeaderTitle: FC<PropsWithChildren & HeaderTitleProps>;
  HeaderControls: FC<PropsWithChildren & HeaderControlsProps>;
  Sticky: FC<PropsWithChildren & StickyProps>;
  Content: FC<PropsWithChildren & ContentProps>;
  Footer: FC<PropsWithChildren & FooterProps>;
};

const SidePanel = SidePanelComponent as SidePanelComponents;
SidePanel.Header = Header;
SidePanel.HeaderTitle = HeaderTitle;
SidePanel.HeaderControls = HeaderControls;
SidePanel.Sticky = Sticky;
SidePanel.Content = Content;
SidePanel.Footer = Footer;

export default SidePanel;
