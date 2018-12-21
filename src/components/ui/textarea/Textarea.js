import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Styles from '../styles';

const TextareaSyled = styled.input`
  ${Styles.input}

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
    wrap: PropTypes.oneOf(['hard', 'soft']),
    onChange: PropTypes.func,
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
    onChange: () => {},
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
        onChange,
        value: v,
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
        {...rest}
      />
    );
  }
}
