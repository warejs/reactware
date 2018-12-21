import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import InputStyles from '../common/InputStyles';

// -padding: 5px;
// -border-radius: 5px;
// -border: none;
// -outline: none;
// -cursor: pointer;

// ${InputStyles}

// -border: 1px solid transparent;
//   -border-image: linear-gradient(to bottom, #535353 0%, #545454 90%, #545454 61%, #696969 100%);
//   -border-image-slice: 1;
//   -box-shadow: inset 0px 0px 1px #000000;
//   -outline: 1px solid #506fac;


// &:focus {
//   color: black;
//   border: 1px solid #506fac;
//   outline: 1px solid #303030;
//   background: white;
//   box-shadow: inset 0px 1px 2px #eee;
// }

// ${props => props.size === 'small' && css`zoom: 75%;`}
//   ${props => props.size === 'large' && css`flex-direction: row;`}
//   ${props => props.size === 'xlarge' && css`flex-direction: row;`}

//   ${props => props.accent === 'default' && css`
//     color: rgba(255, 255, 255, 0.9);
//     background: #fff;
//     color: #3B3E3F;
//     border: 1px solid #CCCCCC;
//     transition: background 300ms, color 300ms;
//     &:hover {
//       color: #fff;
//       background: white;
//     }
//   `}

//   ${props => props.accent === 'primary' && css`
//     color: rgba(255, 255, 255, 0.9);
//     background: #0392CF;
//     transition: background 300ms, color 300ms;
//     &:hover {
//       color: #fff;
//       background: #0ab3fb;
//     }
//   `}

//   ${props => props.active && css`
//     box-shadow: inset 0px 0px 5px gray;
//     background: silver;
//     &:hover {
//       color: #fff;
//       background: silver;
//     }
//   `}

const ButtonStyled = styled.button` 

  font-size: 10px;
  line-height: 1em;

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
    box-shadow: 0 0 0 1px #506fac
  }

  &:active {
    background-image: linear-gradient(#333333 0%, #3f3f3f 5%, #383838 100%);
  }

  &:before {
    content: " ";
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    position: absolute;
    left: -1px;
    top: -1px;
    border-bottom: 1px solid #696969;
    border-radius: 3px;
  }

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
    type: PropTypes.oneOfType(['button', 'submit', 'reset']),
    size: PropTypes.oneOfType(['small', 'normal', 'large', 'xlarge']),
    accent: PropTypes.oneOfType(['default', 'primary', 'secondary', 'danger', 'warning', 'success']),
  };

  static defaultProps = {
    type: 'button',
    size: 'normal',
    accent: 'default',
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
