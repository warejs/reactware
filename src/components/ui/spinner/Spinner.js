import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import InputStyles from '../common/InputStyles';

const InputSyled = styled.input` ${InputStyles}

  
`;

export default class Slider extends React.Component {
  static propTypes = {
    min: PropTypes.string,
    max: PropTypes.string.isRequired,
    value: PropTypes.string,
    step: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    min: '0',
    value: '0',
    step: '1',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  onChange(event) {
    const { value } = event.target;
    this.setState({ value });
    this.props.onChange(value, event);
  }

  render() {
    const {
      props: {
        min, max, step,
      },
      state: {
        value,
      },
    } = this;

    return (
      <InputSyled
        type="number"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={event => this.onChange(event)}
      />
    );
  }
}
