import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Flex } from '../../../layouts';

const InputStyled = styled.input`
  -webkit-appearance: none;
  background-color: #fafafa;
  border: 1px solid #2c2c2c;
  padding: 6px;
  box-sizing: border-box;
  border-radius: 3px;
  display: inline-block;
  position: relative;
  background-image: linear-gradient(#919191 0%,#757575 10%,#636363 100%);
  outline: none;
  transition: all 200ms;
  margin: 0 5px 0 0;
  

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

  &:checked:after {
    content: '✔';
    width: 20px;
    height: 20px;
    border-radius: 50px;
    position: absolute;
    top: -6px;
    left: 3px;
    font-size: 14px;
    color: white;
    text-shadow: 0px 1px 0px black;
  }

  &:checked {
    -background-color: #e9ecee;
    -color: #99a1a7;
    -border: 1px solid #adb8c0;
    -box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1), inset 0px 0px 10px rgba(0,0,0,0.1);
  }

  &:active, &:checked:active {
    -box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
  }

`;


const LabelStyled = styled.label`
  font-size: 10px;
  color: white;
  text-shadow: 0px -1px 0 black;
  user-select: none; 
`;

export default class Checkbox extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    label: '',
    checked: false,
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: Math.random(),
      checked: props.checked,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { checked } = this.props;
    if (nextProps.checked !== checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  onChange(event) {
    const { onChange } = this.props;
    const { checked } = event.target;
    this.setState({ checked });
    onChange(checked, event);
  }

  render() {
    const {
      props: {
        label, checked: ch, disabled, onChange, ...rest
      },
      state: {
        checked, id,
      },
    } = this;

    return (
      <div>
        <Flex horizontal center>
          <InputStyled
            type="checkbox"
            id={`checkbox-${id}`}
            checked={checked}
            onChange={event => this.onChange(event)}
            {...rest}
          />
          <LabelStyled htmlFor={`checkbox-${id}`}>{label}</LabelStyled>
        </Flex>
      </div>
    );
  }
}
