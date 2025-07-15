import React, { useEffect, useId, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import SidePanel from "./SidePanel";
import Button from "../Button";
import Application from "../ApplicationLayout/Application";
import AppMain from "../ApplicationLayout/AppMain";
import { ActionButton } from "../../index";
import Icon from "../Icon";

const meta: Meta<typeof SidePanel> = {
  component: SidePanel,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      const ref = useRef<HTMLDivElement>(null);

      useEffect(() => {
        const el = ref.current;
        if (el) {
          const wrapper = el?.parentElement?.parentElement?.parentElement;
          const parent = wrapper?.parentElement?.parentElement?.parentElement;
          console.log(wrapper);
          if (wrapper) {
            wrapper.style.setProperty("border", "0", "important");
          }
          if (parent) {
            parent.style.margin = "0";
            parent.style.padding = "0";
          }
        }
      }, []);
      document.body.style.padding = "0";

      return (
        <div ref={ref}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

const StoryExample = (args: Story["args"]) => {
  const [isOpen, setIsOpen] = useState(false);

  // Multiple stories get rendered on the docs page, ensure the ids are not colliding
  const id = useId();
  const parentId = args.parentId + id;

  const openPanel = () => {
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
  };

  // Delay opening the panel, so the l-application container is ready to receive it
  useEffect(() => void setTimeout(openPanel, 100), []);

  return (
    <Application id={parentId}>
      <AppMain>
        <Button onClick={openPanel} style={{ margin: "1rem" }}>
          Open side panel
        </Button>
        <Button onClick={closePanel} style={{ margin: "1rem" }}>
          Close side panel
        </Button>
      </AppMain>
      {isOpen && (
        <SidePanel
          overlay={args.overlay}
          loading={args.loading}
          hasError={args.hasError}
          parentId={parentId}
          pinned={args.pinned}
          wide={args.wide}
          className="u-no-padding--top u-no-padding--bottom"
        >
          <SidePanel.Sticky>
            <SidePanel.Header>
              <SidePanel.HeaderTitle>Edit panel</SidePanel.HeaderTitle>
              <SidePanel.HeaderControls>
                <Button
                  appearance="base"
                  className="u-no-margin--bottom"
                  hasIcon
                  onClick={closePanel}
                  aria-label="Close"
                >
                  <Icon name="close" />
                </Button>
              </SidePanel.HeaderControls>
            </SidePanel.Header>
          </SidePanel.Sticky>
          <SidePanel.Content className="u-no-padding">
            <p>Here be dragons!</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              varius mi eu pretium vulputate. Nunc commodo sit amet nibh quis
              rhoncus. Aliquam rhoncus porttitor semper. Aenean faucibus
              consectetur neque in sodales. Sed cursus mauris id ex sollicitudin
              sodales. Quisque molestie rutrum odio, ornare pharetra ligula.
              Pellentesque ornare tristique feugiat. In a augue neque. Aenean
              eget arcu quis lacus tempus posuere in sit amet dui. Suspendisse
              faucibus sapien nisl, nec laoreet sem convallis nec.
            </p>
            <p>
              Vestibulum sed placerat lorem. Nam luctus ex id nisi luctus, id
              vestibulum sem bibendum. Vivamus turpis sem, pellentesque
              fermentum malesuada eu, faucibus porta libero. Duis eget venenatis
              odio. Etiam sed volutpat magna, non tempus erat. Nunc id tortor ac
              quam consectetur dapibus ac ut tellus. Pellentesque ut tellus
              venenatis elit vehicula condimentum eget quis lorem. Ut non
              consectetur est, a fringilla ipsum. Nunc vitae ligula ipsum. Etiam
              suscipit, libero ut lacinia viverra, nunc urna consequat ex, vel
              eleifend eros mauris vitae ipsum. Pellentesque sed dictum augue.
              Ut sit amet ullamcorper mauris. Nunc congue orci mollis purus
              sodales facilisis ac ut arcu. Maecenas feugiat sapien ac massa
              mollis sodales. Donec vitae turpis eu nisi laoreet pulvinar quis
              at nisl. Integer volutpat, metus eget elementum dictum, lacus
              sapien viverra felis, consequat fermentum nisl mi ac dui.
            </p>
            <p>
              Nullam nulla turpis, dignissim vel dapibus ut, volutpat ac dui.
              Donec vel elementum lacus. Mauris maximus nec felis at faucibus.
              Nunc faucibus gravida velit, id blandit lectus tincidunt ac.
              Vestibulum orci diam, elementum in congue eu, placerat id risus.
              Sed tempor tempus tellus, vitae iaculis turpis fringilla nec.
              Phasellus imperdiet facilisis velit, sit amet lobortis odio
              dignissim ut.
            </p>
            <p>
              Nam placerat urna vitae ligula hendrerit, ac tincidunt lorem
              maximus. Mauris eu odio nisi. Nulla facilisi. Sed egestas elit sed
              velit rutrum, sit amet bibendum metus hendrerit. Pellentesque
              luctus placerat tellus, eu bibendum justo. Cras eget leo ac ex
              volutpat gravida. Duis vitae mollis ante. Duis a congue nunc.
              Aenean aliquet, sapien quis tincidunt tincidunt, odio eros
              consectetur lacus, vel finibus mauris tortor id velit. Donec
              tincidunt vitae purus eu interdum. Pellentesque scelerisque dui
              viverra ex ullamcorper volutpat. Vestibulum lacinia vitae arcu
              volutpat porta. Etiam et cursus nulla, id aliquet felis. Nam
              ultricies, urna id mattis pretium, velit erat viverra elit, eu
              maximus diam eros id nisi.
            </p>
            <p>
              Nullam eget nisl lectus. Pellentesque eu mauris ut tortor
              malesuada sagittis. Cras dictum cursus est non ultricies. Duis
              mollis non neque at commodo. Nunc feugiat justo et consequat
              aliquam. Ut consectetur libero eu erat feugiat finibus. Duis
              varius convallis quam eu sagittis. Maecenas ac est arcu.
              Suspendisse at enim eget nibh ultricies dictum. Etiam aliquet
              tellus vel felis malesuada laoreet.
            </p>
          </SidePanel.Content>
          <SidePanel.Sticky position="bottom">
            <SidePanel.Footer className="u-align--right">
              <Button appearance="base" onClick={closePanel}>
                Cancel
              </Button>
              <ActionButton appearance="positive">Save changes</ActionButton>
            </SidePanel.Footer>
          </SidePanel.Sticky>
        </SidePanel>
      )}
    </Application>
  );
};

export const Default: Story = {
  args: {
    className: "",
    hasError: false,
    parentId: "l-application-default",
    pinned: false,
    loading: false,
    overlay: true,
    wide: false,
  },
  render: StoryExample,
};

export const Pinned: Story = {
  args: {
    className: "",
    hasError: false,
    parentId: "l-application-pinned",
    pinned: true,
    loading: false,
    overlay: false,
    wide: false,
  },
  render: StoryExample,
  parameters: {
    docs: {
      disable: true,
    },
  },
};

export const Loading: Story = {
  args: {
    className: "",
    hasError: false,
    parentId: "l-application-loading",
    pinned: false,
    loading: true,
    overlay: true,
    wide: false,
  },
  render: StoryExample,
};

export const Error: Story = {
  args: {
    className: "",
    hasError: true,
    parentId: "l-application-error",
    pinned: false,
    loading: false,
    overlay: true,
    wide: false,
  },
  render: StoryExample,
};

export const Wide: Story = {
  args: {
    className: "",
    hasError: false,
    parentId: "l-application-wide",
    pinned: false,
    loading: false,
    overlay: true,
    wide: true,
  },
  render: StoryExample,
};
