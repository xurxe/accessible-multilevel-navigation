import React from 'react';
import Nav from '.';

export default {
  title: 'Nav',
  parameters: {
    options: {
      showPanel: true,
    },
  },
};

export const welcome = () => (
  <>
    <Nav></Nav>
  </>
);
