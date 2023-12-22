import { Meta, StoryObj } from "@storybook/react";

import { DynamicTypeWriter, DynamicTypeWriterProps } from "./DynamicTypeWriter";

const meta: Meta = {
  title: "Example/useDynamicGeul",
  component: DynamicTypeWriter,
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

type Story = StoryObj<DynamicTypeWriterProps>;

export const Default: Story = {
  args: {
    initial: "",
    value: "안녕하세요",
    speed: 50,
    decomposeOnBackspace: false,
  },
};
