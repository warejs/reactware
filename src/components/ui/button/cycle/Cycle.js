import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Button from '../Button';

export default class Cycle extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    default: PropTypes.number,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    default: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: Math.random(),
      current: props.options[props.default],
      index: props.default,
    };
  }

  onCycle(event) {
    event.preventDefault();

    const {
      props: { options },
      state: { index },
    } = this;

    const nextIndex = options[index + 1] ? index + 1 : 0;

    this.setState({
      current: options[nextIndex],
      index: nextIndex,
    });

    this.props.onCycle(nextIndex, options[nextIndex], event);
  }

  render() {
    const { current } = this.state;

    //return <ButtonStyled {...rest}>{children}</ButtonStyled>;

    return (
      <Button
        type="button"
        onClick={event => this.onCycle(event)}
      >
        {current}
      </Button>
    );
  }
}
