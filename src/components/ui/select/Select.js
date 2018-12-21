import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import InputStyles from '../common/InputStyles';

const SelectSyled = styled.select` ${InputStyles}

  &:focus {
    color: white;
    border: 1px solid 303030;
    outline: #696969;
    background: #3a3a3a;
    box-shadow: inset 0px 0px 1px #000000;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    -box-shadow: inset 0 0 5px black; 
    -bacground: silver;
    -border-radius: 5px;
    background-image: linear-gradient(to right, #333333 , #434343);
  }
  
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    border: 1px solid #434343;
    background-image: linear-gradient(to right, #9a9a9a , #6b6b6b);
  }

  &::-webkit-scrollbar-thumb:hover {
  }

  ${props => props.vertical && css`
    height: 175px;
    writing-mode: bt-lr; 
    -webkit-appearance: slider-vertical; 
    appearance: slider-vertical;
    width: 8px;
    padding: 0 5px;
  `}

`;

export default class Select extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
  };

  static defaultProps = {
    selected: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { selected } = this.props;
    if (nextProps.selected !== selected) {
      this.setState({ selected: nextProps.selected });
    }
  }

  onChange(event) {
    const { options, multiple, onChange } = this.props;
    const { value, options: opt } = event.target;
    const selectedValues = [...opt].filter(o => o.selected).map(o => o.value);
    const selectedOptions = options.filter((o, index) => [...opt][index + 1].selected);
    const selected = multiple ? selectedValues : value;

    this.setState({ selected });
    onChange(
      selected,
      selectedOptions.length === 1 ? selectedOptions[0] : selectedOptions,
      event,
    );
  }

  render() {
    const {
      props: {
        options, multiple, onChange, ...rest
      },
      state: { selected },
    } = this;

    return (
      <SelectSyled
        value={selected}
        onChange={event => this.onChange(event)}
        multiple={multiple}
        {...rest}
      >
        <option value style={{ display: 'none' }} />
        {Object.keys(options).map(index => (
          <option
            key={`option-${index}`}
            value={options[index].value}
          >
            {options[index].label}
          </option>
        ))}
      </SelectSyled>
    );
  }
}
