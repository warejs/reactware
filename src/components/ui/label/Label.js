import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import * as Styles from '../styles';

const LabelStyled = styled.label`
  ${Styles.font.size}
  ${Styles.other.unselectable}
 
  text-decoration: none;
  color: white;
  text-shadow: 0 -1px 0 black;
  cursor: default;
`;

export default class Label extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
  };

  static defaultProps = {
    onClick: () => {},
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
        children, ...rest
      },
    } = this;

    return (
      <LabelStyled
        onClick={event => this.onClick(event)}
        {...rest}
      >
        {children}
      </LabelStyled>
    );
  }
}
