// Button.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LoadingSpinner } from '../Components/LoadingSpinner';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  text: 'LoadingSpinner',
  disabled: false,
  component: LoadingSpinner,
} as ComponentMeta<typeof LoadingSpinner>;

export const Spinner: ComponentStory<typeof LoadingSpinner> = (args) => <LoadingSpinner />;
