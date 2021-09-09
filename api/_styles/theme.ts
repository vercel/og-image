import { CHAIN_IDS } from '../_lib/constants';

const fontSizes = {
  xl: '64px',
  lg: '32px',
  md: '16px',
};

const palette = {
  white: '#ffffff',
  black: '#1F1F41',
  mutedBlack: '#101015',
  trueBlack: '#000000',
  yellow: '#ffb800',
  lightYellow: '#FFEFAF',
  orange: '#FFB900',
  grey: '#7578b5',
  green: '#1dd13a',
  lightGreen: '#E8FAEB',
  brightPurple: '#706EFF',
  lightPurple: '#f6f6ff',
  mutedPurple: '#E8ECFD',
  purple: '#8E8CFF',
  mediumPurple: '#dfdff1',
  darkPurple: '#383e59',
  darkerPurple: '#464678',
  matchaRed: '#FF656D',
  mutedRed: '#FFF0F0',
  blue: '#0F1C46',
  mediumBlue: '#0A1A5D',
  darkBlue: '#1F1F41',
  darkerBlue: '#121226',
  lightBlue: '#F2F2FF',
  mutedBlue: '#F9F9FF',
};
// Based on webflow's breakpoints
const breakpoints = {
  xs: '360px',
  sm: '480px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

type BreakPointType = typeof breakpoints;

const generateMediaQueries = (points: BreakPointType) => ({
  sm: `(min-width: ${points.sm})`,
  md: `(min-width: ${points.md})`,
  lg: `(min-width: ${points.lg})`,
  xl: `(min-width: ${points.xl})`,
  hover: '(hover: hover)',
});

export const liquiditySourceColors = {
  '0x': { light: '#706EFF', dark: '#706EFF' },
  'Uniswap': { light: '#DD1EE1', dark: '#DD1EE1' },
  'UniswapV2': { light: '#DD1EE1', dark: '#DD1EE1' },
  'UniswapV3': { light: '#DD1EE1', dark: '#DD1EE1' },
  'Kyber': { light: '#25A680', dark: '#25A680' },
  'Curve': { light: '#3465A4', dark: '#3465A4' },
  'CurveV2': { light: '#3465A4', dark: '#3465A4' },
  'Oasis': { light: '#FF9C09', dark: '#FF9C09' },
  'Balancer': { light: '#7578B5', dark: '#7578B5' },
  'BalancerV2': { light: '#7578B5', dark: '#7578B5' },
  'Bancor': { light: '#0F59D1', dark: '#0F59D1' },
  'Mooniswap': { light: '#2D3037', dark: '#3a619d' },
  'DODO': { light: '#FFC909', dark: '#FFC909' },
  'mStable': { light: '#306FD7', dark: '#306FD7' },
  'MultiHop': { light: '#706EFF', dark: '#706EFF' },
  'Swerve': { light: '#D16C00', dark: '#D16C00' },
  'SushiSwap': { light: '#00C5A2', dark: '#00C5A2' },
  'Shell': { light: '#0043FF', dark: '#0043FF' },
  'CREAM': { light: '#AFA3FF', dark: '#AFA3FF' },
  'SnowSwap': { light: '#00B9C2', dark: '#00B9C2' },
  'CryptoCom': { light: '#07286C', dark: '#129DFF' },
  'Linkswap': { light: '#2B3A4A', dark: '#295bdb' },
  'MakerPsm': { light: '#0AA18F', dark: '#0AA18F' },
  'KyberDMM': { light: '#25A680', dark: '#25A680' },
  'Smoothy': { light: '#F3A1AD', dark: '#F3A1AD' },
  'Component': { light: '#FF42A1', dark: '#FF42A1' },
  'Saddle': { light: '#3800D6', dark: '#3800D6' },
  'QuickSwap': { light: '#262C37', dark: '#6da8ff' },
  'ComethSwap': { light: '#10B1E9', dark: '#10B1E9' },
  'Dfyn': { light: '#6496AC', dark: '#6496AC' },
  'Polydex': { light: '#36C3EA', dark: '#36C3EA' },
  'WaultSwap': { light: '#3AAFA9', dark: '#3AAFA9' },
  'ApeSwap': { light: '#AF6E5A', dark: '#AF6E5A' },
  'BakerySwap': { light: '#2C2522', dark: '#ffcd84' },
  'Ellipsis': { light: '#407FD7', dark: '#407FD7' },
  'Belt': { light: '#4D483B', dark: '#FCB251' },
  'CafeSwap': { light: '#9B2829', dark: '#9B2829' },
  'CheeseSwap': { light: '#20151D', dark: '#d646b4' },
  'JulSwap': { light: '#463EB4', dark: '#463EB4' },
  'Nerve': { light: '#6940DA', dark: '#6940DA' },
  'PancakeSwap': { light: '#6C3AD0', dark: '#6C3AD0' },
  'PancakeSwapV2': { light: '#6C3AD0', dark: '#6C3AD0' },
  'xSigma': { light: '#EB6A97', dark: '#EB6A97' },
  'Lido': { light: '#F18076', dark: '#F18076' },
  'FirebirdOneSwap': { light: '#F37029', dark: '#F37029' },
  'ShibaSwap': { light: '#10121C', dark: '#ffa409' },
  'IronSwap': { light: '#FFB03C', dark: '#FFB03C' },
  'ACryptoS': { light: '#E9A043', dark: '#E9A043' },
};

// Unique liquidity sources as defined by our color theming
export const liquiditySourceKeys = Object.keys(liquiditySourceColors);
export const liquiditySourceCount = Object.keys(liquiditySourceColors).length;

export const TOKEN_GRADIENT_CSS_MAP = {
  REPV2: 'linear-gradient(180deg, #E2FFF8 0%, #D2FFF4 100%)',
  USDC: 'linear-gradient(180deg, #ABEDFF 0%, #98E3FF 100%)',
  ZRX: 'linear-gradient(180deg, #D7D7D7 0%, #C0C0C0 100%)',
  BTC: 'linear-gradient(180deg, #FFE8CC 0%, #FFD6A4 100%)',
  WBTC: 'linear-gradient(180deg, #FFF6E7 0%, #FFEDD1 100%)',
  LINK: 'linear-gradient(180deg, #B8CBFF 0%, #608BFF 100%)',
  BAT: 'linear-gradient(180deg, #FFEAD5 0%, #FEC698 100%)',
  KNC: 'linear-gradient(180deg, #D6FFFA 0%, #9FFDF1 100%)',
  DAI: 'linear-gradient(180deg, #FFEFB1 0%, #FFECA6 100%)',
  USDT: 'linear-gradient(180deg, #D7FFFC 0%, #A9FFF7 100%)',
  SNX: 'linear-gradient(180deg, #E3E3F0 0%, #D3D3E4 100%)',
  ANT: ' linear-gradient(180deg, #CBF8FF 0%, #AEF4FF 100%)',
  ENJ: 'linear-gradient(180deg, #DCD3FF 0%, #B1ABED 100%)',
  SNT: 'linear-gradient(180deg, #D7DFFF 0%, #A5AAFF 100%)',
  TUSD: 'linear-gradient(180deg, #CCD3FF 0%, #97A5F5 100%)',
  ETH: 'linear-gradient(180deg, #E4EAFD 0%, #BCC8F1 100%)',
  WETH: 'linear-gradient(180deg, #E4EAFD 0%, #BCC8F1 100%)',
  REN: 'linear-gradient(180deg, #E1E7F8 0%, #ADB7CE 100%)',
  IMBTC: 'linear-gradient(180deg, #E7E9FF 0%, #D0D4F1 100%)',
  NMR: 'linear-gradient(180deg, #E1E1E1 0%, #A5A5A5 100%)',
  MKR: 'linear-gradient(180deg, #CBFFFB 0%, #C7FEF9 100%)',
  MANA: 'linear-gradient(180deg, #FFE6DA 0%, #FFC0A3 100%)',
  COMP: 'linear-gradient(180deg, #D5FBF1 0%, #BFFAEB 100%)',
  UMA: 'linear-gradient(180deg, #FFD9E0 0%, #FFAFC0 100%)',
  RENBTC: 'linear-gradient(180deg, #B8CBFF 0%, #608BFF 100%)',
  BAL: 'linear-gradient(180deg, #EEEEEE 0%, #C2C2C2 100%)',
  LEND: 'linear-gradient(180deg, #ABEDFF 0%, #98E3FF 100%)',
  YFI: 'linear-gradient(180deg, #ABEDFF 0%, #98E3FF 100%)',
  AMPL: 'linear-gradient(180deg, #EEEEEE 0%, #C2C2C2 100%)',
  KEEP: 'linear-gradient(180deg, #CFFFF1 0%, #A6FFE6 100%)',
  CRV: 'linear-gradient(180deg, #FFD5C7 0%, #BCC4FF 100%)',
  OMG: 'linear-gradient(180deg, #E1E1E1 0%, #A5A5A5 100%)',
  BAND: 'linear-gradient(180deg, #9FCAFF 0%, #529FFF 100%)',
  PAX: 'linear-gradient(180deg, #ABEDFF 0%, #98E3FF 100%)',
  BUSD: 'linear-gradient(180deg, #FFEFB1 0%, #FFECA6 100%)',
  FOAM: 'linear-gradient(180deg, #FFF1EE 0%, #FFF1EE 100%)',
  LPT:
    'linear-gradient(180deg, rgba(113, 252, 164, 0.5) 0%, rgba(103, 242, 154, 0.5) 100%)',
  MUSD: 'linear-gradient(180deg, #E1E1E1 0%, #A5A5A5 100%)',
  BNT: 'linear-gradient(180deg, #B8CBFF 0%, #608BFF 100%)',
  DONUT: 'linear-gradient(180deg, #FFD2E5 0%, #FF94BF 100%)',
  BZRX: 'linear-gradient(180deg, #9FCAFF 0%, #529FFF 100%)',
  UNI: 'linear-gradient(180deg, #FFF2F8 0%, #F9CBE0 100%)',
  SUSD: 'linear-gradient(180deg, #EEEEEE 0%, #C2C2C2 100%)',
  SETH: 'linear-gradient(180deg, #CFFFE2 0%, #A6FFBF 100%)',
  $BASED: 'linear-gradient(180deg, #ABEDFF 0%, #98E3FF 100%)',
  SRM: 'linear-gradient(180deg, #ABEDFF 0%, #98E3FF 100%)',
  AKRO: 'linear-gradient(180deg, #FBEFFF 0%, #E8C1FF 100%)',
  SWRV: 'linear-gradient(180deg, #EEEEEE 0%, #C2C2C2 100%)',
  QNT: 'linear-gradient(180deg, #DCD3FF 0%, #B1ABED 100%)',
  TBTC: 'linear-gradient(180deg, #E1E1E1 0%, #A5A5A5 100%)',
  SUSHI: 'linear-gradient(180deg, #CCD3FF 0%, #97A5F5 100%)',
  PAXG: 'linear-gradient(180deg, #FFEFB1 0%, #FFECA6 100%)',
  PICKLE: 'linear-gradient(180deg, #D6FFCF 0%, #B8FFA6 100%)',
  STAKE: 'linear-gradient(180deg, #CFFFF1 0%, #A6FFE6 100%)',
  CREAM: 'linear-gradient(180deg, #CFFFF1 0%, #A6FFE6 100%)',
  RENZEC: 'linear-gradient(180deg, #EEEEEE 0%, #C2C2C2 100%)',
  AAVE: 'linear-gradient(180deg, #ABEDFF 0%, #98E3FF 100%)',
  AUDIO: 'linear-gradient(180deg, #FBEFFF 0%, #E8C1FF 100%)',
  MTA: 'linear-gradient(180deg, #E1E1E1 0%, #A5A5A5 100%)',
  BOND: 'linear-gradient(180deg, #FFD3D3 0%, #FFB6B6 100%)',
  GUSD: 'linear-gradient(180deg, #ABEDFF 0%, #98E3FF 100%)',
  WCELO: 'linear-gradient(180deg, #FFEFB1 0%, #FFECA6 100%)',
  WCUSD: 'linear-gradient(180deg, #D6FFCF 0%, #B8FFA6 100%)',
  BNB: 'linear-gradient(180deg, #FFF3DF 0%, #FFEDD2 100%)',
  WBNB: 'linear-gradient(180deg, #FFF3DF 0%, #FFEDD2 100%)',
  MATIC: 'linear-gradient(180deg, #FFECFF 0%, #FAC3FF 100%)',
  WMATIC: 'linear-gradient(180deg, #FFECFF 0%, #FAC3FF 100%)',
};

export const UnknownTokenGradient = '#E8ECFD';
export const UnknownTokenSecondaryColor = '#E8ECFD';
export const UnknownTokenPrimaryColor = '#1F1F41';

export const CHAIN_COLORS = {
  [CHAIN_IDS.BSC]: '#F0BA0C',
  [CHAIN_IDS.MAINNET]: '#454A75',
  [CHAIN_IDS.MATIC]: '#8247E5',
  [CHAIN_IDS.ROPSTEN]: 'blue',
};

export const getTokenGradientBySymbol = (
  symbol: string,
): string | undefined => {
  const normalizedSymbol = symbol.toUpperCase();
  return (TOKEN_GRADIENT_CSS_MAP as any)[normalizedSymbol];
};

// Based on Bootstrap z-indexes
const zIndices = {
  sticky: 1020,
  fixed: 1030,
  overlay: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

const fontWeights = {
  h1: 600,
  bold: 700,
  semiBold: 600,
  medium: 500,
};

// const opacities = {
//   secondaryText: 0.6,
// };

const lightTheme = {
  zIndices,
  fontWeights,
  breakpoints,
  fontSizes: {
    h1: fontSizes.xl,
    paragraph: fontSizes.md,
    navLink: fontSizes.md,
  },
  palette,
  colors: {
    backgroundColor: palette.white,
    contrastingBackgroundColor: palette.black,
    secondaryBackgroundColor: palette.lightPurple,
    tertiaryBackgroundColor: palette.lightBlue,
    foregroundColor: palette.mutedBlue,
    widgetPrimaryColor: palette.white,
    widgetSecondaryColor: palette.lightPurple,
    primaryText: palette.black,
    contrastingPrimaryText: palette.white,
    secondaryText: palette.grey,
    borderColor: palette.mutedPurple,
    secondaryBorderColor: palette.mutedPurple,
    hoverColor: palette.lightPurple,
    disabledColor: palette.mediumPurple,
    boxShadow: 'rgba(33, 35, 74, 0.17)',
    secondaryBoxShadow: 'rgba(0, 0, 0, 0.05)',
    tertiaryBoxShadow: 'rgba(31, 31, 65, 0.05)',
    buttonBoxShadow: 'rgba(255, 255, 255, 0.25)',
    iconColor: palette.mediumBlue,
    secondaryIconColor: palette.darkBlue,
    liquiditySourceColors,
  },
  mediaQueries: generateMediaQueries(breakpoints),
};

const darkTheme = {
  zIndices,
  fontWeights,
  breakpoints,
  fontSizes: {
    h1: fontSizes.xl,
    paragraph: fontSizes.md,
    navLink: fontSizes.md,
  },
  palette: palette,
  colors: {
    backgroundColor: palette.darkerBlue,
    contrastingBackgroundColor: palette.brightPurple,
    secondaryBackgroundColor: palette.darkBlue,
    tertiaryBackgroundColor: palette.darkBlue,
    foregroundColor: palette.blue,
    widgetPrimaryColor: palette.darkBlue,
    widgetSecondaryColor: palette.darkerBlue,
    primaryText: palette.white,
    contrastingPrimaryText: palette.white,
    secondaryText: palette.mediumPurple,
    borderColor: palette.darkerPurple,
    secondaryBorderColor: palette.darkBlue,
    hoverColor: palette.darkBlue,
    disabledColor: palette.darkPurple,
    boxShadow: 'rgba(33, 35, 74, .8)',
    secondaryBoxShadow: 'rgba(255,255,255, 0.05)',
    tertiaryBoxShadow: 'rgba(31, 31, 65, 1)',
    buttonBoxShadow: 'rgba(0, 0, 0, 0.02)',
    iconColor: palette.purple,
    secondaryIconColor: palette.purple,
    liquiditySourceColors,
  },
  mediaQueries: generateMediaQueries(breakpoints),
};

export type ITheme = typeof lightTheme;

const themes: { [key: string]: ITheme } = {
  light: lightTheme,
  dark: darkTheme,
};

export { themes };
