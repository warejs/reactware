import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const GridStyled = styled.div`
  display: grid;

  ${props => props.gap && css`grid-gap: ${props.gap};`}
  ${props => props.columns && css`grid-template-columns: repeat(${props.columns}, ${props.width});`}
  ${props => (props.min || props.max) && css`
    grid-template-columns: repeat(auto-fit, minmax(${props.min}, ${props.max || 'auto'}));
  `}

  ${props => props.columns && props.widths && css`
    grid-template-columns: ${props.widths};
  `}
  
  ${props => props.rows && css`grid-template-rows: repeat(${props.rows}, 1fr);`}
  ${props => props.span && css`
    display: block;
    grid-column: span ${props.span}/span ${props.span};
  `}

  ${props => props.self && props.start && css`justify-self: start;`}
  ${props => props.self && props.center && css`justify-self: center;`}
  ${props => props.self && props.end && css`justify-self: flex-end;`}
  ${props => props.self && props.stretch && css`justify-self: stretch;`}

  ${props => props.topleft && css`
    align-items: start;
    justify-items: start;
  `}

  ${props => props.topcenter && css`
    align-items: start;
    justify-items: center;
  `}

  ${props => props.topright && css`
    align-items: start;
    justify-items: end;
  `}

  ${props => props.centerleft && css`
    align-items: center;
    justify-items: start;
  `}

  ${props => props.center && css`
    align-items: center;
    justify-items: center;
  `}

  ${props => props.centerright && css`
    align-items: center;
    justify-items: end;
  `}

  ${props => props.bottomleft && css`
    align-items: end;
    justify-items: start;
  `}

  ${props => props.bottomcenter && css`
    align-items: end;
    justify-items: center;
  `}

  ${props => props.bottomright && css`
    align-items: end;
    justify-items: end;
  `}

  ${props => props.track && css`
    display: block;
    grid-column: ${props.track.split(' ')[0]};
    grid-row: ${props.track.split(' ')[1]};
  `}
`;


export default class Flex extends React.Component {
  static propTypes = {
    columns: PropTypes.string,
    width: PropTypes.string,
    widths: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    rows: PropTypes.string,
    span: PropTypes.string,
    self: PropTypes.bool,
    start: PropTypes.bool,
    center: PropTypes.bool,
    end: PropTypes.bool,
    stretch: PropTypes.bool,
    gap: PropTypes.string,
  };

  static defaultProps = {
    columns: '1',
    width: '1fr',
    widths: null,
    min: null,
    max: null,
    rows: null,
    span: null,
    self: null,
    start: null,
    center: null,
    end: null,
    stretch: null,
    gap: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, ...rest } = this.props;
    return <GridStyled {...rest}>{children}</GridStyled>;
  }
}
