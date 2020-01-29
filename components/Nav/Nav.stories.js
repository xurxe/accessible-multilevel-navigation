import React from 'react';
import Nav from '.';
import data from '../../data/nav';

export default {
  title: 'Nav',
  parameters: {
    options: {
      showPanel: true,
    },
  },
};

export const none = () => <Nav data={data} />;

export const wide = () => (
  <Nav
    data={data}
    layout="wide"
    color="white"
    background="var(--purple)"
    animated={true}
  />
);

export const tall = () => (
  <Nav
    data={data}
    layout="tall"
    color="white"
    background="var(--purple)"
    animated={false}
  />
);
