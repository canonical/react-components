import { Meta, StoryObj } from "@storybook/react";

import ScrollableContainer from "./ScrollableContainer";
import React from "react";
import { Description, Subtitle, Title } from "@storybook/blocks";

const meta: Meta<typeof ScrollableContainer> = {
  component: ScrollableContainer,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ScrollableContainer>;

const StoryExample = (args: Story["args"]) => {
  return (
    <div>
      <h1>Above contents</h1>
      <ScrollableContainer belowIds={args.belowIds} dependencies={[]}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius
          mi eu pretium vulputate. Nunc commodo sit amet nibh quis rhoncus.
          Aliquam rhoncus porttitor semper. Aenean faucibus consectetur neque in
          sodales. Sed cursus mauris id ex sollicitudin sodales. Quisque
          molestie rutrum odio, ornare pharetra ligula. Pellentesque ornare
          tristique feugiat. In a augue neque. Aenean eget arcu quis lacus
          tempus posuere in sit amet dui. Suspendisse faucibus sapien nisl, nec
          laoreet sem convallis nec.
        </p>
        <p>
          Vestibulum sed placerat lorem. Nam luctus ex id nisi luctus, id
          vestibulum sem bibendum. Vivamus turpis sem, pellentesque fermentum
          malesuada eu, faucibus porta libero. Duis eget venenatis odio. Etiam
          sed volutpat magna, non tempus erat. Nunc id tortor ac quam
          consectetur dapibus ac ut tellus. Pellentesque ut tellus venenatis
          elit vehicula condimentum eget quis lorem. Ut non consectetur est, a
          fringilla ipsum. Nunc vitae ligula ipsum. Etiam suscipit, libero ut
          lacinia viverra, nunc urna consequat ex, vel eleifend eros mauris
          vitae ipsum. Pellentesque sed dictum augue. Ut sit amet ullamcorper
          mauris. Nunc congue orci mollis purus sodales facilisis ac ut arcu.
          Maecenas feugiat sapien ac massa mollis sodales. Donec vitae turpis eu
          nisi laoreet pulvinar quis at nisl. Integer volutpat, metus eget
          elementum dictum, lacus sapien viverra felis, consequat fermentum nisl
          mi ac dui.
        </p>
        <p>
          Nullam nulla turpis, dignissim vel dapibus ut, volutpat ac dui. Donec
          vel elementum lacus. Mauris maximus nec felis at faucibus. Nunc
          faucibus gravida velit, id blandit lectus tincidunt ac. Vestibulum
          orci diam, elementum in congue eu, placerat id risus. Sed tempor
          tempus tellus, vitae iaculis turpis fringilla nec. Phasellus imperdiet
          facilisis velit, sit amet lobortis odio dignissim ut.
        </p>
        <p>
          Nam placerat urna vitae ligula hendrerit, ac tincidunt lorem maximus.
          Mauris eu odio nisi. Nulla facilisi. Sed egestas elit sed velit
          rutrum, sit amet bibendum metus hendrerit. Pellentesque luctus
          placerat tellus, eu bibendum justo. Cras eget leo ac ex volutpat
          gravida. Duis vitae mollis ante. Duis a congue nunc. Aenean aliquet,
          sapien quis tincidunt tincidunt, odio eros consectetur lacus, vel
          finibus mauris tortor id velit. Donec tincidunt vitae purus eu
          interdum. Pellentesque scelerisque dui viverra ex ullamcorper
          volutpat. Vestibulum lacinia vitae arcu volutpat porta. Etiam et
          cursus nulla, id aliquet felis. Nam ultricies, urna id mattis pretium,
          velit erat viverra elit, eu maximus diam eros id nisi.
        </p>
        <p>
          Nullam eget nisl lectus. Pellentesque eu mauris ut tortor malesuada
          sagittis. Cras dictum cursus est non ultricies. Duis mollis non neque
          at commodo. Nunc feugiat justo et consequat aliquam. Ut consectetur
          libero eu erat feugiat finibus. Duis varius convallis quam eu
          sagittis. Maecenas ac est arcu. Suspendisse at enim eget nibh
          ultricies dictum. Etiam aliquet tellus vel felis malesuada laoreet.
        </p>
      </ScrollableContainer>
      <div id="footer">
        <h2 className="u-no-margin">Below contents</h2>
        <div>here be dragons.</div>
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    belowIds: ["footer"],
  },
  render: StoryExample,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
        </>
      ),
    },
  },
};
