import React from 'react';

import { ComponentMeta } from '@storybook/react';

import { IconButton } from '../Components/IconButton';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'IconButton',
  component: IconButton,
} as ComponentMeta<typeof IconButton>;