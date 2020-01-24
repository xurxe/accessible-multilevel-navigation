import { configure, addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withHTML } from '../addons/storybook-addon-live-html/decorators/react';

// Add all the "*.stories.js" files as Storybook stories.
configure(require.context('../components', true, /\.stories\.js$/), module);

// Enables a11y addon.
addDecorator(withA11y);

// Enables HTML addon.
addDecorator(
  withHTML({
    prettier: {
      tabWidth: 2,
      useTabs: false,
    },
  })
);

addParameters({
  // axe options.
  a11y: {
    // Optional selector which element to inspect.
    element: '#root',
    // axe-core configuration.
    // @see https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1
    config: {},
    // axe-core options.
    // @see https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter
    options: {},
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});
