import {injectGlobal} from 'emotion';
import {fontStacks, metrics, colorList, colors} from './Theme';

injectGlobal`
  * {
    font-family: ${fontStacks.content};
  }
  
  h1,h2,h3,h4,h5,h6 {
    font-family: ${fontStacks.header};
  }

  blockquote {
    margin-left: ${metrics.spacing};
    padding-left: ${metrics.spacing};
    border-left: 1px solid ${colors.primary}
  }
  
  pre {
    border: 1px solid ${colorList.grey1};
    background-color; ${colorList.grey0};
    padding: ${metrics.spacing};
    border-radius: ${metrics.borderRadiusSmall};
  }
`;