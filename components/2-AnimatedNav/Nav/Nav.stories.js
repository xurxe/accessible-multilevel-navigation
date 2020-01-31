import React from 'react';
import Nav from '.';
import data from '../../../data/nav';
import { theme1, theme2 } from '../../theme';

export default {
  title: 'Animated nav',
  parameters: {
    options: {
      showPanel: true,
    },
  },
};

export const wide = () => <Nav data={data} layout="wide" theme={theme2} />;

export const tall = () => <Nav data={data} layout="tall" theme={theme2} />;
