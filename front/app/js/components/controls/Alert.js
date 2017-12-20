import React from 'react';
import {css} from 'emotion';
import { withStyles, styleComponentPropTypes, createClassNameFromProps } from './common/StyleManager';
import {joinClasses, omit} from '../../utils/componentUtils';
import Link from './Anchor';

const componentStyle = css`
  border-left-width: 5px;
  `;

class BAlert extends React.PureComponent {
  render() {
    return (
      <div className={joinClasses(createClassNameFromProps(this.props), componentStyle)} role="alert">{this.props.children}</div>
    );
  }
}

export const Alert =  withStyles('alert')(BAlert);

export const AlertHeading = props => <h4
  className='alert-heading'>{props.children}</h4>;

export const AlertLink = ({className, ...rest}) => {
  let cleanedProps = omit(styleComponentPropTypes, rest);

  return <Link
    className={joinClasses('alert-link', className)} {...cleanedProps}/>;
};

export const AlertClose = (props) => <button type="button" className="close" data-dismiss="alert" aria-label="Close" {...props}>
  <span aria-hidden="true">&times;</span>
</button>;