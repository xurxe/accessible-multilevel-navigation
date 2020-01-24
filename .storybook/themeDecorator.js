import React from 'react';
import { ThemeProvider, GlobalStyles, theme } from 'Theme';

// Decorator for applying ThemeProvider & GlobalStyles on Storybook components.
const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme()}>
    <GlobalStyles />
    {storyFn()}
  </ThemeProvider>
);

export default ThemeDecorator;
