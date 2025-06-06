import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const FlexStyled = styled.div`
  display: flex;

  ${props => props.horizontal && css`flex-direction: row;`}
  ${props => props.vertical && css`flex-direction: column;`}
  ${props => props.wrap && css`flex-wrap: wrap;`}
  ${props => props.auto && css`flex: 1 1 auto;`}

  ${props => props.start && css`align-items: flex-start;`}
  ${props => props.center && css`align-items: center;`}
  ${props => props.end && css`align-items: flex-end;`}

  ${props => props.ratio && css`flex: ${props.ratio};`}

  ${props => props.justified && props.start && css`justify-content: flex-start;`}
  ${props => props.justified && props.center && css`justify-content: center;`}
  ${props => props.justified && props.end && css`justify-content: flex-end;`}
  ${props => props.justified && props.around && css`justify-content: space-around;`}
  ${props => props.justified && props.spaced && css`justify-content: space-between;`}

  ${props => props.self && props.start && css`align-self: flex-start;`}
  ${props => props.self && props.center && css`align-self: center;`}
  ${props => props.self && props.end && css`align-self: flex-end;`}
  ${props => props.self && props.stretch && css`align-self: stretch;`}

`;

export default class Flex extends React.Component {
  static propTypes = {
    horizontal: PropTypes.bool,
    vertical: PropTypes.bool,
    wrap: PropTypes.bool,
    auto: PropTypes.bool,
    start: PropTypes.bool,
    center: PropTypes.bool,
    end: PropTypes.bool,
    justified: PropTypes.bool,
    around: PropTypes.bool,
    spaced: PropTypes.bool,
    self: PropTypes.bool,
    stretch: PropTypes.bool,
  };

  static defaultProps = {
    horizontal: null,
    vertical: null,
    wrap: null,
    auto: null,
    start: null,
    center: null,
    end: null,
    justified: null,
    around: null,
    spaced: null,
    self: null,
    stretch: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, ...rest } = this.props;
    return <FlexStyled {...rest}>{children}</FlexStyled>;
  }
}
