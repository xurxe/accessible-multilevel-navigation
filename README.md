# Accessible multilevel navigation

Multilevel navigation menus are tricky to make, and there's many pitfalls that can make them very difficult or impossible to use for many people with disabilities. Here's my take on it!

## Demo

[Check it out on Netlify](https://accessible-multilevel-nav.netlify.com/)!

## How it works

### Data

This multilevel navigation component is **recursive**. That means that it can go as many levels deep as you want, as long as the data looks something like this:

```js
const nav = [
  {
    text: 'Home',
    slug: '',
    id: 1,
    children: null,
  },
  {
    text: 'Fruits',
    slug: 'fruits',
    id: 2,
    children: [
      {
        text: 'Apple',
        slug: 'apple',
        id: 3,
        children: null,
      },
      {
        text: 'Banana',
        slug: 'banana',
        id: 4,
        children: null,
      },
    ],
  },
];
```

### Components

The `Nav` component simply calls the `NavLevel` component.

For each element in the array, `NavLevel` checks if it has children. If it does, it renders the `NavLevelDropdown` component; if it doesn't, it simply calls the `NavLink` component.

The `NavLevelDropdown` component renders a `NavLink` component, and a toggle button next to it. When pressed, this button reveals the next level with a new `NavLevel` component. And so on and so forth.

The `NavLink` component is just a good old link.

Finally, there's the `RestartButton` component. It's rendered after the last item on that level; it's invisible to the eyes, and will go unnoticed to many users:

- When someone is using a keyboard or keyboard-emulating technology, focus on this button will redirect focus straight away  to the button that toggles the visibility of that level
- When someone is using a screen reader, and the reader is just allowed to keep reading on its own (as opposed to the user using the keyboard to tab through focusable items), the screen reader will announce the following instructions: "Tab to hear this submenu from the beginning. Press Space to close this submenu.". If the user does nothing, the screen reader will leave the submenu, close it, and continue reading the next items on the `Nav`.

### Accessibility features

- `RestartButton`: see previous section
- Semantic code:
  - Uses `<nav>`as top-level element
  - Each level is an `<ul>` element
  - Each item in a level is an `<li>` element
  - `<a>` elements take you somewhere, `<button>` elements do something
- Toggle buttons (in `NavLevelDropdown`):
  - Are identified as toggle buttons with `aria-pressed`
  - Are identified as toggling expand/collapse state with `aria-expanded`
  - Since they're icons only, they have a suitable `aria-label` as a text alternative ("Show [name] submenu" or "Open [name] submenu")
  - Icons in buttons are `aria-hidden`
- Focus visible:
  - Uses `focus-visible` polyfill to show default browser focus highlights only when user is navigating with a keyboard or similar technology
  - Since default browser focus highlights may be insufficient, especially on colored backgrounds, additional focus styles are provided
- Contrast (in the two example themes): WCAG Level AAA

### Theming

If you wanna use theming, you must provide an object that looks something like this:

```js
const theme = {
  color: ['#FFFFFF', '#FFFFFF'],
  background: ['#5B37BF', '#9E005D'],
  accent: ['#BAA2FF', '#FFC7E8'],
};
```

It doesn't actually matter if all the arrays are the same lenght, so this also works:

```js
const theme = {
  color: ['#FFFFFF'],
  background: ['#5B37BF', '#9E005D'],
  accent: ['#FFF48A'],
};
```

The colors will be looped through the levels. So, in any of the above examples, background color will be `#5B37BF` on level 0, `#9E005D` on level 1, `#5B37BF` again on level 2, etc. The logic for this is used all over the styled components, and it's goes something like:

```js
`background-color: ${theme.background[level % theme.background.length]};`;
```

With `level % theme.background.length` we find out which index of the array we should be using for this level. Following the example above, for level 0 we get `0 % 2 = 0`, so we use the color at index 0. Then for level 1 we get `1 % 2 = 1`. For level 2 we get `2 % 2 = 0` again, etc.

### Other parameters

- `layout` determines the orientation of the nav menu:

  - `layout="wide"` gives a horizontal menu
  - `layout="tall"` gives a vertical menu
  - `layout="auto"` is responsive to viewport width (ok, not actually implemented yet, but coming soon)

- `animated={true | false}` lets you choose if you want animations or not

## Technologies and tools

- React
- Storybook
- Styled Components
- focus-visible polyfill
- Netlify

## Author

- Xurxe Toivo García

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
