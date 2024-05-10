import React from "react";
import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import CodeSnippet from "./CodeSnippet";
import { CodeSnippetBlockAppearance } from "./CodeSnippetBlock";

const meta: Meta<typeof CodeSnippet> = {
  component: CodeSnippet,
  tags: ["autodocs"],

  argTypes: {
    className: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CodeSnippet>;

export const Default: Story = {
  render: () => (
    <CodeSnippet
      blocks={[
        {
          code: "Mode: all Settings: maas_url=http://192.168.122.1:5240/MAAS",
        },
      ]}
    />
  ),

  name: "Default",
};

/**
 * Use the `title` prop to add a title to a code block.
 */
export const Title: Story = {
  render: () => (
    <CodeSnippet
      blocks={[
        {
          title: "Output",
          code: "Mode: all Settings: maas_url=http://192.168.122.1:5240/MAAS",
        },
      ]}
    />
  ),

  name: "Title",
};

/**
 * Pass an array of `blocks` to render multiple code blocks (for example input and output) within a single code snippet.
 */
export const MultipleBlocks: Story = {
  render: () => (
    <CodeSnippet
      blocks={[
        {
          title: "JavaScript",
          code: "console.log('Vanilla');",
        },
        {
          title: "Output",
          code: "Vanilla",
        },
      ]}
    />
  ),

  name: "Multiple blocks",
};

/**
 * Use `appearance` to control the visual aspects of the code block. `"numbered"` appearance will add line numbers in the code blocks.
 * Values of `"linuxPrompt"`, `"windowsPrompt"`, `"url"` will add a relevant icon in the code block.
 */
export const Appearance: Story = {
  render: () => (
    <CodeSnippet
      blocks={[
        {
          title: "Install on Linux",
          appearance: CodeSnippetBlockAppearance.LINUX_PROMPT,
          code: "snap install toto",
        },
        {
          title: "Install on Windows",
          appearance: CodeSnippetBlockAppearance.WINDOWS_PROMPT,
          code: "snap install toto",
        },
        {
          title: "Get from the Store",
          appearance: CodeSnippetBlockAppearance.URL,
          code: "http://snapcraft.io/toto",
        },
      ]}
    />
  ),

  name: "Appearance",
};

/**
 * Set `wrapLines` prop to `true` to enable line wrapping inside the code block.
 */
export const WrapLines: Story = {
  render: () => (
    <CodeSnippet
      blocks={[
        {
          appearance: CodeSnippetBlockAppearance.NUMBERED,
          wrapLines: true,

          code: `#!/bin/bash
set -eu . $CONJURE_UP_SPELLSDIR/sdk/common.sh
if [[ "$JUJU_PROVIDERTYPE" == "lxd" ]]; then
  debug "Running pre-deploy for $CONJURE_UP_SPELL"
  sed "s/##MODEL##/$JUJU_MODEL/" $(scriptPath)/lxd-profile.yaml | lxc profile edit "juju-$JUJU_MODEL" || exposeResult "Failed to set profile" $? "false"
fi
exposeResult "Successful pre-deploy." 0 "true"`,
        },
      ]}
    />
  ),

  name: "Wrap lines",
};

/**
 * Dropdown select menus can be added to the headers of code blocks to allow users to choose one of the options. The dropdowns options are passed via `dropdowns` property in the block options object.
 *
 * With the `options` being an array of option properties compatible with the `Select` options (`[{ label: string, value: string | number }]`).
 */
export const Dropdown: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [lang, setLang] = useState("html");

    const code = {
      js: `console.log("Example 1");`,
      css: `.p-heading--2 { color: red; }`,
      html: `<h1 class="p-heading--2">How to use code snippets</h1>`,
    };

    return (
      <CodeSnippet
        blocks={[
          {
            code: code[lang],

            dropdowns: [
              {
                options: [
                  {
                    value: "js",
                    label: "JS",
                  },
                  {
                    value: "css",
                    label: "CSS",
                  },
                  {
                    value: "html",
                    label: "HTML",
                  },
                ],

                value: lang,

                onChange: (event) => {
                  setLang(event.target.value);
                },
              },
            ],
          },
        ]}
      />
    );
  },

  name: "Dropdown",
};

/**
 * Multiple dropdowns can be passed in if needed.
 */
export const Dropdowns: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [channel, setChannel] = useState("stable");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [snap, setSnap] = useState("firefox");
    const code = `sudo snap install ${snap} ${channel === "stable" ? "" : "--" + channel}`;

    return (
      <CodeSnippet
        blocks={[
          {
            title: "Install snap",
            code: code,

            dropdowns: [
              {
                options: [
                  {
                    value: "stable",
                    label: "stable",
                  },
                  {
                    value: "candidate",
                    label: "candidate",
                  },
                  {
                    value: "beta",
                    label: "beta",
                  },
                  {
                    value: "edge",
                    label: "edge",
                  },
                ],

                value: channel,

                onChange: (event) => {
                  setChannel(event.target.value);
                },
              },
              {
                options: [
                  {
                    value: "firefox",
                    label: "Firefox",
                  },
                  {
                    value: "gimp",
                    label: "Gimp",
                  },
                  {
                    value: "vlc",
                    label: "VLC",
                  },
                ],

                value: snap,

                onChange: (event) => {
                  setSnap(event.target.value);
                },
              },
            ],
          },
        ]}
      />
    );
  },

  name: "Dropdowns",
};

/**
 * If multiple dropdowns may overlap with long title you can use `stacked` variant, by setting the relevant property on code block options.
 */
export const DropdownsStacked: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [channel, setChannel] = useState("stable");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [snap, setSnap] = useState("firefox");
    const code = `sudo snap install ${snap} ${channel === "stable" ? "" : "--" + channel}`;

    return (
      <CodeSnippet
        blocks={[
          {
            title:
              "Install Firefox, Gimp or VLC as a snap from different channels using command line",
            code: code,
            stacked: true,

            dropdowns: [
              {
                options: [
                  {
                    value: "stable",
                    label: "stable",
                  },
                  {
                    value: "candidate",
                    label: "candidate",
                  },
                  {
                    value: "beta",
                    label: "beta",
                  },
                  {
                    value: "edge",
                    label: "edge",
                  },
                ],

                value: channel,

                onChange: (event) => {
                  setChannel(event.target.value);
                },
              },
              {
                options: [
                  {
                    value: "firefox",
                    label: "Firefox",
                  },
                  {
                    value: "gimp",
                    label: "Gimp",
                  },
                  {
                    value: "vlc",
                    label: "VLC",
                  },
                ],

                value: snap,

                onChange: (event) => {
                  setSnap(event.target.value);
                },
              },
            ],
          },
        ]}
      />
    );
  },

  name: "DropdownsStacked",
};

/**
 * Custom elements can be passed to a CodeBlock via the `content` prop. In these cases, a border will be added around the entire code snippet to visually associate the content with the code block.
 */
export const Content: Story = {
  render: () => (
    <CodeSnippet
      blocks={[
        {
          title: "With embedded iframe",
          code: "<iframe src='/iframe.html?id=button--base&viewMode=story'></iframe>",
          content: (
            <iframe
              title="iframe"
              src="/iframe.html?viewMode=story&id=components-button--default&args="
            ></iframe>
          ),
        },
      ]}
    />
  ),

  name: "Content",
};

/**
 * It's possible to pass JSX instead of strings to the `code` parameter, either as a single element or an array (e.g. if you want to display line numbers).
 */
export const JsxCodeElements: Story = {
  render: () => (
    <CodeSnippet
      blocks={[
        {
          code: (
            <>
              <strong>snap</strong>install<a href="#test">toto</a>
              <br />
              <strong>apt</strong>install<a href="#test">toto</a>
            </>
          ),
        },
      ]}
    />
  ),

  name: "JSX code elements",
};
