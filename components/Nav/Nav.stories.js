import React from 'react';
import Nav from '.';
import data from '../../data/nav';
import { theme1, theme2 } from '../theme';

export default {
  title: 'Multilevel nav',
  parameters: {
    options: {
      showPanel: true,
    },
  },
};

export const noTheme = () => <Nav data={data} />;

export const wideSimple = () => (
  <Nav data={data} theme={theme1} layout="wide" animated={false} />
);

export const tallSimple = () => (
  <Nav data={data} theme={theme1} layout="tall" animated={false} />
);

export const wideAnimated = () => (
  <Nav data={data} theme={theme2} layout="wide" animated={true} />
);

export const tallAnimated = () => (
  <Nav data={data} theme={theme2} layout="tall" animated={true} />
);
