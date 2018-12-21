import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import * as Styles from '../styles';

const A = styled.a`
  ${Styles.font.size}

  cursor: pointer;
  text-decoration: none;
  color: #7fa9d2;
  text-shadow: 0 -1px 0 black;
  
  &:visited {
    color: #7fa9d2;
  }

  &:hover {
    color: #71a0cf;
  }

  &:active {
    color: #95bfea;
  }
`;

export default class Link extends React.Component {
  static propTypes = {
    to: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    to: null,
    onClick: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onClick(event) {
    const { onClick, to } = this.props;
    if (!to) event.preventDefault();
    onClick(event);
  }

  render() {
    const {
      props: {
        children, to, ...rest
      },
    } = this;

    return (
      <A
        onClick={event => this.onClick(event)}
        target="_blank"
        href={to}
        {...rest}
      >
        {children}
      </A>
    );
  }
}
