import { Meta, StoryObj } from "@storybook/react";

import { PipedTypeWriter, PipedTypeWriterProps } from "./PipedTypeWriter";

const meta: Meta = {
  title: "Example/useGeulPipe",
  component: PipedTypeWriter,
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

type Story = StoryObj<PipedTypeWriterProps>;

export const Default: Story = {
  args: {
    initial: "",
    values: ["안녕", "안녕하세요", "안녕", "안녕 여러분"],
    speed: 50,
    decomposeOnBackspace: false,
  },
};
