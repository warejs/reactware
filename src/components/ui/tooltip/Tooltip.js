import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import * as Styles from '../styles';

const SpanContentStyled = styled.span`
  ${Styles.font.size}
  ${Styles.other.unselectable}

  background-color: #3a3a3a;
  border-radius: 3px;
  color: white;
  display: inline-block;
  left: 50%;
  opacity: 0;
  padding: 5px;
  pointer-events: none;
  position: absolute;
  text-align: left;
  bottom: 100%;

  transition: all 200ms ease 1s;
  transform: translate(-50%, 0px);
  transform-origin: 0 10px;
  white-space: nowrap;

  ${props => props.width && css`width: ${props.width};`}
  ${props => props.height && css`height: ${props.height};`}
  ${props => props.wrap && css`white-space: normal;`}

  &:before {
    content: ' ';
    border-color: transparent;
    border-top-color: #3a3a3a;
    border-style: solid;
    border-width: 5px;
    display: block;
    height: 0;
    left: 50%;
    margin-left: -5px;
    position: absolute;
    bottom: -10px;
    width: 0;
  }
  
  &:after {
    content: ' ';
    display: block;
    position: absolute;
    bottom: -20px;
    left: 0;
    width: 100%;
    height: 20px;
  }

  &:hover {
    transform: translate(-50%, -5px);
    opacity: 1;
    pointer-events: auto;
  }

  ${props => props.position === 'left' && css`
    bottom: auto;
    top: 50%;
    right: 100%;
    left: auto;
    transform: translate(0px, -50%);
    &:before {
      width: 0;
      right: -10px;
      left: auto;
      top: 50%;
      margin-top: -5px;
      border-left-color: #3a3a3a;
      border-top-color: transparent;
    }
    &:after {
      top: 0;
      right: -5px;
      left: auto;
      width: 10px;
      height: 100%;
    }
  `}

  ${props => props.position === 'right' && css`
    bottom: auto;
    top: 50%;
    left: 100%;
    right: auto;
    transform: translate(0px, -50%);
    &:before {
      width: 0;
      right: -10px;
      top: 50%;
      margin-top: -5px;
      border-right-color: #3a3a3a;
      border-top-color: transparent;
      left: -5px;
    }
    &:after {
      top: 0;
      left: -10px;
      width: 10px;
      height: 100%;
    }
  `}

  ${props => props.position === 'bottom' && css`
    right: auto;
    top: 100%;
    bottom: auto;
    left: 50%;
    &:before {
      width: 0;
      right: -10px;
      margin-top: -10px;
      border-bottom-color: #3a3a3a;
      border-top-color: transparent;
      top: 0;
      left: 50%;
    }
    &:after {
      top: -10px;
      height: 10px;
      right: 0px;
      left: 0px;
      width: 100%;
    }
  `}
  
`;

const SpanStyled = styled.span`
  ${Styles.font.size}
  ${Styles.other.unselectable}

  display: inline-block;
  perspective: 500px;
  position: relative;

  &:hover { cursor: pointer; }
  &:hover > ${SpanContentStyled} {
    transform: translate(-50%, -10px);
    opacity: 1;
    pointer-events: auto;

    ${props => props.position === 'left' && css`
      transform: translate(-10px, -50%);
      right: 100%;
    `}

    ${props => props.position === 'right' && css`
      transform: translate(10px, -50%);
    `}

    ${props => props.position === 'bottom' && css`
      transform: translate(-50%, 10px);
    `}
  }

  
`;


export default class Tooltip extends React.Component {
  static propTypes = {
    contents: PropTypes.any,
    wrap: PropTypes.bool,
    height: PropTypes.string,
    width: PropTypes.string,
    position: PropTypes.oneOf(['left', 'right', 'bottom']),
  };

  static defaultProps = {
    contents: '',
    wrap: false,
    height: null,
    width: null,
    position: null,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onClick(event) {
    const { onClick } = this.props;
    event.preventDefault();
    onClick(event);
  }

  render() {
    const {
      props: {
        children,
        contents,
        width,
        height,
        wrap,
        position,
        ...rest
      },
    } = this;

    return (
      <SpanStyled {...rest} position={position}>
        {children}
        <SpanContentStyled
          width={width}
          height={height}
          wrap={wrap}
          position={position}
        >
          {contents}
        </SpanContentStyled>
      </SpanStyled>
    );
  }
}
