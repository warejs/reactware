import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import * as Styles from '../styles';

const ButtonStyled = styled.button` 
  ${Styles.font.size};

  padding: 3px 5px;

  color: white;
  background: #535353;
  background-image: linear-gradient(#919191 0%, #757575 5%, #636363 100%);
  outline: 1px solid transparent;
  border: 1px solid #303030;
  border-radius: 3px;
  
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  position: relative;
  transition: all 200ms;

  &:active,
  &:focus {
    box-shadow: 0 0 0 1px #506fac;
  }

  &:active {
    background-image: linear-gradient(#333333 0%, #3f3f3f 5%, #383838 100%);
  }

  ${Styles.before.border.bottom}
  
  &:focus:before,
  &:active:before {
    z-index: -1;
  }

  ${props => props.active && css`
    background-image: linear-gradient(#333333 0%, #3f3f3f 5%, #383838 100%);
    &:hover {
      background-image: linear-gradient(#333333 0%, #3f3f3f 5%, #383838 100%);
    }
  `}

`;

export default class Button extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
  };

  static defaultProps = {
    type: 'button',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, ...rest } = this.props;
    return <ButtonStyled {...rest}>{children}</ButtonStyled>;
  }
}
