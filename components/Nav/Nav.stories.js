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

export const none = () => (
  <>
    <Nav data={data} />
  </>
);

export const horizontal = () => (
  <>
    <Nav data={data} style="horizontal" />
  </>
);
