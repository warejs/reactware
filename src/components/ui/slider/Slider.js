import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const ContainerSyled = styled.div`
  ${props => props.vertical && css`
    position: relative;
    height: ${props.height};
    display: inline-block;
    transform: rotate(-90deg);
  `}
`;

const DatalistStyled = styled.datalist`
  display: flex;
  justify-content: space-between;
  padding-left: 2px;
`;

const OptionsSyled = styled.option`
  font-size: 10px;
  padding: 0;
  width: 15px;
  text-align: center;
  position: relative;
  margin-top: 4px;
  color: white;
  opacity: 0.5;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 1);

  ${props => props.dashes && css`
    &:after {
      content: " ";
      height: 4px;
      width: 1px;
      background: #b8b8b8;
      position: absolute;
      left: calc(50% - 1px);
      top: -4px;
    }
  `}

  ${props => props.dashes && !props.labels && css`
    font-size: 0px;
    line-height: 0px;
  `}

  ${props => props.vertical && css`
    transform: rotate(90deg);
    text-align: left;
    margin-top: 6px;
    height: 20px;
  `} 

  ${props => props.vertical && props.dashes && css`
    &:after {
      left: -6px;
      top: calc(50% - 1px);
      transform: rotate(90deg);
    }
  `} 
`;

const InputSyled = styled.input`

  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  margin: 0;
  outline: none;
  border-radius: 9px;
  border: 1px solid #232323;
  background-image: linear-gradient(#2b2b2b,#4b4b4b);
  box-sizing: border-box;


  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border: 1px solid gray;
    background: white;
    background-image: linear-gradient(#cacaca, #747474);
    cursor: pointer;
    border-radius: 15px;
    border: 1px solid #3b3b3b;
  }

`;

  // ${props => props.vertical && css`
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   margin: 0;
  //   padding: 0;
  //   width: ${props.height};
  //   transform: translate(-50%, -50%) rotate(-90deg);
  // `}

export default class Slider extends React.Component {
  static propTypes = {
    min: PropTypes.string,
    max: PropTypes.string.isRequired,
    value: PropTypes.string,
    step: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    vertical: PropTypes.bool,
    height: PropTypes.string,
    labels: PropTypes.bool,
    dashes: PropTypes.bool,
  };

  static defaultProps = {
    min: '0',
    value: '0',
    step: '1',
    vertical: null,
    height: '100px',
    labels: null,
    dashes: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: Math.random(),
      value: props.value,
    };
  }

  onChange(event) {
    const { onChange } = this.props;
    const { value } = event.target;
    this.setState({ value });
    onChange(value, event);
  }

  renderDatalist() {
    const {
      step, max, dashes, labels, vertical,
    } = this.props;

    const list = [];
    const count = max / step;
    for (let i = 0; i <= count; i += 1) {
      list.push(
        <OptionsSyled
          key={`options-${i}`}
          vertical={vertical}
          dashes={dashes}
          labels={labels}
        >
          {i * step}
        </OptionsSyled>,
      );
    }
    return list;
  }

  render() {
    const {
      props: {
        min, max, step, vertical, height, labels, dashes,
      },
      state: {
        id, value,
      },
    } = this;

    return (
      <ContainerSyled vertical={vertical} height={height}>
        <InputSyled
          type="range"
          value={value}
          onChange={event => this.onChange(event)}
          orient={vertical ? 'vertical' : null}
          list={`dl-${id}`}
          vertical={vertical}
          height={height}
          sstep={step}
          min={min}
          max={max}
        />
        {(labels || dashes) && (
          <DatalistStyled list={`dl-${id}`}>
            {this.renderDatalist()}
          </DatalistStyled>
        )}
      </ContainerSyled>
    );
  }
}
