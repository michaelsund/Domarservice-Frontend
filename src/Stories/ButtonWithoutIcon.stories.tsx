// Button.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../Components/Button';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  text: 'Button without icon',
  disabled: false,
  component: Button,
} as ComponentMeta<typeof Button>;

// 👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>
  </Button>
);

// 👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = { text: 'Primary', disabled: false };

export const Secondary = Template.bind({});
Secondary.args = { ...Primary.args, text: 'Secondary' };

export const Disabled = Template.bind({});
Disabled.args = { ...Primary.args, text: 'Disabled', disabled: true };
