import React from 'react';
import {css} from 'emotion';
import { withBootStrap, bootStrapPropTypes, generateClassName } from '../shared/BootStrapHOC';
import {joinClasses, cleanProps} from '../shared/utils';
import Link from './Link';

const ALERT_CSS = css`
  border-left-width: 5px !important;
  `;

class BAlert extends React.PureComponent {
  render() {
    return (
      <div className={joinClasses(generateClassName(this.props), ALERT_CSS)} role="alert">{this.props.children}</div>
    );
  }
}

BAlert.defaultProps = {};
BAlert.propTypes = {};

export const Alert =  withBootStrap('alert')(BAlert);

export const AlertHeading = props => <h4
  className='alert-heading'>{props.children}</h4>;

export const AlertLink = ({className, ...rest}) => {
  let cleanedProps = cleanProps(bootStrapPropTypes, rest);

  return <Link
    className={joinClasses('alert-link', className)} {...cleanedProps}/>;
};

export const AlertClose = (props) => <button type="button" className="close" data-dismiss="alert" aria-label="Close" {...props}>
  <span aria-hidden="true">&times;</span>
</button>;