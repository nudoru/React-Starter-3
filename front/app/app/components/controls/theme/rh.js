const colorList = {
  redLight1        : 'rgb(208,170,171)',
  redLight2        : 'rgb(207,131,131)',
  redLight3        : 'rgb(205,88,88)',
  redLight4        : 'rgb(204,48,49)',
  red              : 'rgb(202, 6, 18)',
  redDark1         : 'rgb(162, 4, 12)',
  redDark2         : 'rgb(129, 2, 8)',
  redDark3         : 'rgb(89, 1, 3)',
  redDark4         : 'rgb(89, 1, 3)',
  redDark5         : 'rgb(70, 1, 2)',
  redDark6         : 'rgb(50, 0, 1)',
  greyLight        : 'rgb(220, 220, 220)',
  greyDark         : 'rgb(76, 76, 76)',
  grey0            : 'rgb(248, 248, 248)',
  grey1            : 'rgb(240, 240, 240)',
  grey2            : 'rgb(230, 230, 230)',
  grey3            : 'rgb(210, 210, 210)',
  grey4            : 'rgb(190, 190, 190)',
  grey5            : 'rgb(170, 170, 170)',
  grey6            : 'rgb(150, 150, 150)',
  grey7            : 'rgb(130, 130, 130)',
  grey8            : 'rgb(110, 110, 110)',
  grey9            : 'rgb(90, 90, 90)',
  grey10           : 'rgb(70, 70, 70)',
  grey11           : 'rgb(50, 50, 50)',
  grey12           : 'rgb(30, 30, 30)',
  blue             : 'rgb(22, 185, 225)',
  blue1            : 'rgb(218, 245, 250)',
  blue2            : 'rgb(193, 237, 246)',
  blue3            : 'rgb(156, 228, 242)',
  blue4            : 'rgb(132, 221, 239)',
  blue5            : 'rgb(107, 214, 236)',
  blue6            : 'rgb(62, 200, 229)',
  blue7            : 'rgb(12, 175, 215)',
  blue8            : 'rgb(0, 160, 205)',
  blueLight        : 'rgb(164, 219, 231)',
  blueLight1       : 'rgb(232, 246, 249)',
  blueLight2       : 'rgb(210, 237, 243)',
  blueLight3       : 'rgb(183, 226, 235)',
  blueDark         : 'rgb(3, 65, 82)',
  blueDark1        : 'rgb(129, 160, 168)',
  blueDark2        : 'rgb(79, 122, 133)',
  blueDark3        : 'rgb(29, 85, 99)',
  gold             : 'rgb(239, 171, 50)',
  gold1            : 'rgb(252, 237, 208)',
  gold2            : 'rgb(250, 229, 184)',
  gold3            : 'rgb(249, 220, 162)',
  gold4            : 'rgb(248, 211, 140)',
  gold5            : 'rgb(244, 194, 99)',
  gold6            : 'rgb(241, 178, 68)',
  green            : 'rgb(148, 212, 56)',
  green1           : 'rgb(234, 245, 208)',
  green2           : 'rgb(224, 241, 185)',
  green3           : 'rgb(213, 236, 163)',
  green4           : 'rgb(203, 232, 140)',
  green5           : 'rgb(182, 223, 102)',
  green6           : 'rgb(171, 219, 85)',
  teal             : 'rgb(11, 122, 134)',
  teal1            : 'rgb(217, 235, 237)',
  teal2            : 'rgb(204, 228, 231)',
  teal3            : 'rgb(180, 215, 218)',
  teal4            : 'rgb(155, 202, 206)',
  teal5            : 'rgb(106, 175, 181)',
  teal6            : 'rgb(57, 149, 157)',
  purple           : 'rgb(58, 1, 127)',
  purple1          : 'rgb(226, 218, 235)',
  purple2          : 'rgb(205, 192, 221)',
  purple3          : 'rgb(176, 155, 201)',
  purple4          : 'rgb(156, 130, 189)',
  purple5          : 'rgb(135, 105, 176)',
  purple6          : 'rgb(116, 81, 162)',
  rhStorage1       : 'rgb(235, 122, 40)',
  rhStorage2       : 'rgb(239, 171, 50)',
  rhInfrastr1      : 'rgb(12, 136, 202)',
  rhInfrastr2      : 'rgb(22, 185, 225)',
  rhAppdev1        : 'rgb(66, 156, 65)',
  rhAppdev2        : 'rgb(148, 212, 56)',
  // From PatternFly
  successColor     : 'rgb(66, 156, 65)',
  successColorLight: 'rgb(206, 229, 206)',
  successColorDark : 'rgb(48, 118, 45)',
  warningColor     : 'rgb(235, 122, 40)',
  warningColorLight: 'rgb(250, 221, 199)',
  warningColorDark : 'rgb(178, 92, 26)',
  dangerColor      : 'rgb(202, 6, 18)',
  dangerColorLight : 'rgb(241, 190, 194)',
  dangerColorDark  : 'rgb(138, 3, 9)',
  infoColor        : 'rgb(22, 185, 225)',
  infoColorLight   : 'rgb(126, 219, 241)',
  infoColorDark    : 'rgb(14, 139, 171)',
  neutralColor     : 'rgb(187, 187, 187)',
  neutralColorLight: 'rgb(229, 229, 229)'
};

const colors = {
  primary  : colorList.red,
  secondary: colorList.blue,
  light    : 'rgb(229, 229, 229)',
  neutral  : 'rgb(187, 187, 187)',
  dark     : colorList.grey9,
  text     : 'rgb(76, 76, 76)',
  headings : 'rgb(76, 76, 76)',
  link     : 'rgb(27, 191, 248)',
  linkHover: 'rgb(27, 162, 226)'
};

const fontStacks = {
  header : '\'Overpass\', \'Helvetica Neue\', Helvetica, Arial, sans-serif !default',
  content: '\'Overpass\', \'Helvetica Neue\', Helvetica, Arial, sans-serif !default'
};

const modularScale = {
  ms10  : '11.089rem',
  ms9   : '8.755rem',
  ms8   : '6.854rem',
  ms7   : '5.411rem',
  ms6   : '4.236rem',
  ms5   : '3.344rem',
  ms4   : '2.618rem',
  ms3   : '2.067rem',
  ms2   : '1.618rem',
  ms1   : '1.277rem',
  ms0   : '1rem',
  'ms-1': '0.618rem',
  'ms-2': '0.382rem',
  'ms-3': '0.236rem',
  'ms-4': '0.146rem'
};

const shadows = {
  textLight    : '1px 1px 0 rgba(255,255,255,.5)',
  textDark     : '1px 1px 0 rgba(0,0,0,.25)',
  textDarkSmall: '1px 1px 3px rgba(0,0,0,.25)',
  textEmboss   :
    '-1px -1px 0 rgba(0, 0, 0, .15), 1px 1px 0 rgba(255, 255, 255, .1)',
  boxLight     : '1px 1px 0 rgba(255,255,255,.5)',
  boxDark      : '1px 1px 0 rgba(0,0,0,.2)',
  boxXSmall    : '0 1px 1px 0 rgba(0,0,0,.2)',
  boxSmall     : '1px 1px 3px rgba(0,0,0,.2)',
  boxMedium    : '2px 2px 7px rgba(0,0,0,.2)',
  boxLarge     : '5px 5px 15px rgba(0,0,0,.2)',
  boxXLarge    : '5px 5px 30px rgba(0,0,0,.2)',
  buttonPress  : 'inset 0px 2px 7px rgba(0,0,0,.2)'
};

const gradients = {
  bars     :
    'linear-gradient(-45deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.2) 22%,rgba(255,255,255,.1) 22.01%,rgba(255,255,255,0) 85%,rgba(255,255,255,.15) 85.01%,rgba(255,255,255,0) 100%)',
  light    : 'linear-gradient(to bottom, transparent, rgba(255,255,255,.1))',
  dark     : 'linear-gradient(to bottom, transparent, rgba(0,0,0,.1))',
  solidDark: 'linear-gradient(to bottom, rgba(0,0,0,.1), rgba(0,0,0,.1))'
};

const metrics = {
  spacing          : modularScale.ms0,
  borderRadiusSmall: '0px',
  borderRadius     : modularScale.ms0,
  fontSizeTiny     : modularScale['ms-1'],
  fontSizeSmall    : modularScale.ms0,
  fontSize         : modularScale.ms1,
  fontSizeLarge    : modularScale.ms3
};

const transitions = {
  transition    : '.33s ease-out',
  timingFunction: 'cubic-bezier(.42,0,.58,1)'
};

const grids = {};

const forms = {
  height     : '4rem',
  border     : `1px solid ${colorList.grey3}`,
  borderFocus: `1px solid ${colorList.infoColor}`,
  borderError: `1px solid ${colorList.dangerColor}`
};

const buttons = {
  paddingTB: modularScale['ms-2'],
  paddingLR: modularScale.ms1
};
const tables  = {};

const cards = {
  defaultWidth: '100%'
};

export default {
  colorList,
  colors,
  fontStacks,
  metrics,
  shadows,
  gradients,
  transitions,
  grids,
  forms,
  buttons,
  tables,
  cards
};
