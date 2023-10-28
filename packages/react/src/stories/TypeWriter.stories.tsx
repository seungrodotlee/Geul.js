import { Meta, StoryObj } from "@storybook/react";

import { TypeWriter, TypeWriterProps } from "./TypeWriter";

const meta: Meta = {
  title: "Example/Things",
  component: TypeWriter,
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<TypeWriterProps>;

export const Default: Story = {
  args: {
    initial: "",
    value: "안녕하세요",
    speed: 50,
    decomposeOnBackspace: true,
  },
  // render: (props) => <TypeWriter {...props} />,
};
