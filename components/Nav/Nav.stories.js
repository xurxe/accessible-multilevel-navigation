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

export const example = () => (
  <>
    <Nav data={data} />
  </>
);
