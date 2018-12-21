import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Flex, Grid } from '../../../layouts';

const InputStyled = styled.input`
  -webkit-appearance: none;
  background-color: #fafafa;
  border: 1px solid #2c2c2c;
  padding: 6px;
  box-sizing: border-box;
  border-radius: 7px;
  display: inline-block;
  position: relative;
  background-image: linear-gradient(#919191 0%,#757575 15%,#636363 100%);
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
    border-radius: 7px;
  }

  &:focus:before,
  &:active:before {
    z-index: -1;
  }

  &:checked:after {
    content: ' ';
    background: white;
    border: 1px solid #2e2e2e;
    width: 6px;
    height: 6px;
    border-radius: 50px;
    position: absolute;
    top: 2px;
    left: 2px;
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

export default class Radio extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.number,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    selected: -1,
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: Math.random(),
      selected: props.selected,
    };
  }

  onChange(index, event) {
    const { onChange } = this.props;
    this.setState({ selected: index });
    onChange(index, event);
  }

  render() {
    const {
      props: {
        options, disabled, onChange, ...rest
      },
      state: {
        selected, id,
      },
    } = this;

    //return <ButtonStyled {...rest}>{children}</ButtonStyled>;
   
    return (
      <Grid gap="3px">
        {
          options.map((option, index) => (
            <Flex horizontal center key={`${id}-${option}`}>
              <InputStyled
                type="radio"
                id={`radio-${id}-${index}`}
                checked={index === selected}
                onChange={event => this.onChange(index, event)}
                {...rest}
              />
              <LabelStyled htmlFor={`radio-${id}-${index}`}>{option}</LabelStyled>
            </Flex>
          ))
        }
      </Grid>
    );
  }
}
