const brand = {
  // Primary palette
  purpleHeart: '#5B37BF',
  tranquil: '#F7FFFF',
  martinique: '#2F2942',

  // Accent colors
  purpleHugs: '#9E005D',
  steelGray: '#221F2D',
  bittersweet: '#FF7060',
  orange: '#FEAD2C',
  fog: '#BAA2FF',
  mellow: '#FFF48A',
  paleRose: '#FFC7E8',
  white: '#FFFFFF',

  // Grays
  scarpaFlow: '#555161',
  stone: '#767283',
  topaz: '#9B98A4',
  graySuit: '#C4C2CC',
  finnishWinter: '#E7E6EB',
  mischka: '#F7F7F8',

  // Semantic
  success: '#007F6C',
  error: '#CC0066',
  warning: '#9D6A00',
  information: '#147992',
};

export const theme1 = {
  color: ['white', 'white'],
  background: [brand.purpleHeart, brand.purpleHugs],
  accent: [brand.fog, brand.paleRose],
  animated: true,
};

export const theme2 = {
  color: ['white'],
  background: [brand.purpleHugs, brand.scarpaFlow, brand.stone],
  accent: [brand.paleRose],
  animated: false,
};
