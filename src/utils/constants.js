const THEME_MAP = {
  SpX: 'neptune',
  ULA: 'neptune',
  NGIS: 'neptune',
  ASA: 'neptune',
  ISRO: 'saturn',
  OS: 'moon',
  ILS: 'moon',
  RL: 'earth',
  ISA: 'earth',
  CASC: 'mars',
  EP: 'mars',
  RFSA: 'mars',
  VKS: 'mars',
  VO: 'mars',
  KhSC: 'mars',
  iSpace: 'mars',
  CHNR: 'mars',
}

const STATUS_MAP = {
  1: 'Go for launch',
  2: 'Estimated',
  3: 'Successful',
  4: 'Failed',
  5: 'Unknown',
  6: 'In flight',
  7: 'Unknown',
}

const THEME = {
  DEFAULT: 'default',
  DARK: 'dark',
  LIGHT: 'light',
}

const HEAD_COLORS = {
  [THEME.DEFAULT]: '#0D0C1E',
  [THEME.DARK]: '#000',
  [THEME.LIGHT]: '#eee',
}

export { THEME_MAP, STATUS_MAP, THEME, HEAD_COLORS }
