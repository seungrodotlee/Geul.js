import { Meta, StoryObj } from '@storybook/react';
import { Things, ThingsProps } from './Things';

const meta: Meta = {
  title: 'Example/Things',
  component: Things,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<ThingsProps>;

export const Default: Story = {
  args: {
    name: '이승로',
  },
  render: props => <Things {...props} />,
};
