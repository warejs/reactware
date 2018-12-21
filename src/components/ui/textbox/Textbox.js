import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import * as Styles from '../styles';

const InputSyled = styled.input`
  ${Styles.input} 

`;

export default class Slider extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: '',
    placeholder: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    if (nextProps.value !== value) {
      this.setState({ value: nextProps.value });
    }
  }

  onChange(event) {
    const { onChange } = this.props;
    const { value } = event.target;
    this.setState({ value });
    onChange(value, event);
  }


  render() {
    const {
      props: { value: v, onChange, ...rest },
      state: { value },
    } = this;
    
    return (
      <InputSyled
        type="text"
        value={value}
        onChange={event => this.onChange(event)}
        {...rest}
      />
    );
  }
}
