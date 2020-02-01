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
  <Nav data={data} layout="wide" theme={theme1} animated={false} />
);

export const tallSimple = () => (
  <Nav data={data} layout="tall" theme={theme1} animated={false} />
);

export const wideAnimated = () => (
  <Nav data={data} layout="wide" theme={theme2} animated={true} />
);

export const tallAnimated = () => (
  <Nav data={data} layout="tall" theme={theme2} animated={true} />
);
