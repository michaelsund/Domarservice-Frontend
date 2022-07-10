// Card.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Card } from '../Components/Card';
import { Button } from '../Components/Button';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  text: 'Card',
  disabled: false,
  component: Card,
} as ComponentMeta<typeof Card>;

// 👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Card> = () => (
  <Card>
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Card Header
    </h5>
    <p className="text-base mb-4">A simple card!</p>
    <Button text="With a button" />
  </Card>
);

// 👇 Each story then reuses that template
export const Main = Template.bind({});
