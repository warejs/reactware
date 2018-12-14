import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Textbox from '../textbox';
import Select from '../select';
import Grid from '../../layouts/grid';

const StyledSelect = styled(Select)`
  padding: 2px 5px 2px 2px;
  border: none;
  box-shadow: none;
  border-left: 1px solid #303030;
  border-right: 1px solid #303030;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  background: #606060;
  background-image: linear-gradient(#919191 0%, #757575 5%, #636363 100%);
  border-top: 1px solid #303030;
`;

const StyledTextbox = styled(Textbox)`
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
`;

export default class Combotext extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  };

  static defaultProps = {
    value: '',
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

  onChange(value, event) {
    event.preventDefault();

    const { onChange } = this.props;
    this.setState({ value });
    onChange(value, null, event);
  }

  onSelect(index, option, event) {
    event.preventDefault();
    event.target.blur();

    const { onChange } = this.props;
    const { callback } = option;
    let { value } = option;
    if (callback) value = callback(this.state.value); //eslint-disable-line
    this.setState({ value });
    onChange(value, option, event);
  }

  render() {
    const {
      props: {
        value: val, options, onChange, ...rest
      },
      state: { value },
    } = this;

    return (
      <React.Fragment>
        <Grid columns="1" rows="1" width="1fr 20px">
          <Grid track="1/3 1">
            <StyledTextbox
              value={value}
              onChange={(_value, event) => this.onChange(_value, event)}
              {...rest}
            />
          </Grid>
          <Grid track="2/3 1" style={{ zIndex: '0' }}>
            <StyledSelect
              type="button"
              options={options}
              onFocus={event => event.target.selectedIndex = -1 } //eslint-disable-line
              onChange={(v, option, event) => {
                const { selectedIndex } = event.target;
                this.onSelect(selectedIndex - 1, option, event);
              }}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}


/* <ul style={{display: visableSelect ? 'block' : 'none'}}>
          {
            Object.keys(options).map(index => (
              <li key={`${id}-${options[index].label}`}>
                <a
                  role="button"
                  type="button"
                  disabled={disabled}
                  onClick={event => this.onSelect(index, options[index], event)}
                  checked={options[index].label === current.label}
                  href={`#${options[index].label}`}
                >
                  {options[index].label}
                </a>
              </li>
            ))
          }
        </ul> */