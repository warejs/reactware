import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import InputStyles from '../common/InputStyles';

const TextareaSyled = styled.textarea` ${InputStyles}
  
  resize: none;
`;

export default class Textarea extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    autofocus: PropTypes.bool,
    disabled: PropTypes.bool,
    maxlength: PropTypes.number,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    rows: PropTypes.number,
    wrap: PropTypes.oneOfType(['hard', 'soft']),
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: '',
    autofocus: null,
    disabled: null,
    maxlength: null,
    name: null,
    placeholder: '',
    required: null,
    rows: 3,
    wrap: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  onChange(event) {
    const { onChange } = this.props;
    const { value } = event.target;
    this.setState({ value });
    onChange(value, event);
  }

  render() {
    const {
      props: {
        autofocus,
        disabled,
        maxlength,
        name,
        placeholder,
        required,
        rows,
        wrap,
        ...rest
      },
      state: { value },
    } = this;

    return (
      <TextareaSyled
        value={value}
        autoFocus={autofocus}
        disabled={disabled}
        maxLength={maxlength}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        wrap={wrap}
        onChange={event => this.onChange(event)}
      />
    );
  }
}
