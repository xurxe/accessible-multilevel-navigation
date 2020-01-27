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
      {
        text: 'Cherry',
        slug: 'cherry',
        id: 5,
        children: null,
      },
    ],
  },
  {
    text: 'Vegetables',
    slug: 'vegetables',
    id: 6,
    children: [
      {
        text: 'Asparagus',
        slug: 'asparagus',
        id: 7,
        children: null,
      },
      {
        text: 'Broccoli',
        slug: 'broccoli',
        id: 8,
        children: null,
      },
      {
        text: 'Cauliflower',
        slug: 'cauliflower',
        id: 9,
        children: null,
      },
    ],
  },
  {
    text: 'Recipes',
    slug: 'recipes',
    id: 10,
    children: [
      {
        text: 'Sweet',
        slug: 'sweet',
        id: 11,
        children: [
          {
            text: 'Vegan',
            slug: 'vegan',
            id: 12,
            children: [
              {
                text: 'Apple crumble',
                slug: 'apple-crumble',
                id: 13,
                children: null,
              },
              {
                text: 'Cherry pie',
                slug: 'apple-crumble',
                id: 14,
                children: null,
              },
            ],
          },
          {
            text: 'Vegetarian',
            slug: 'vegetarian',
            id: 15,
            children: [
              {
                text: 'Bananas Foster',
                slug: 'bananas-foster',
                id: 16,
                children: null,
              },
            ],
          },
        ],
      },
      {
        text: 'Savory',
        slug: 'savory',
        id: 17,
        children: [
          {
            text: 'Vegan',
            slug: 'vegan',
            id: 18,
            children: [
              {
                text: 'Broccoli stir-fry',
                slug: 'broccoli-stir-fry',
                id: 19,
                children: null,
              },
            ],
          },
          {
            text: 'Vegetarian',
            slug: 'vegetarian',
            id: 20,
            children: [
              {
                text: 'Asparagus omelette',
                slug: 'asparagus-omelette',
                id: 21,
                children: null,
              },
              {
                text: 'Cauliflower pizza',
                slug: 'cauliflower-pizza',
                id: 22,
                children: null,
              },
            ],
          },
        ],
      },
    ],
  },
];
export default nav;
