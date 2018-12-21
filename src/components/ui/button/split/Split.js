import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Button from '../Button';
import Select from './../../select/';
import Grid from '../../../layouts/grid';

const StyledSelect = styled(Select)`
  padding: 1px 5px 2px 2px;
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

// padding: 1px 5px 2px 2px;
// border: none;
// box-shadow: none;
// border-left: 1px solid #303030;
// border-right: 1px solid #303030;
// border-top-right-radius: 3px;
// border-bottom-right-radius: 3px;
// background: #606060;
// background-image: linear-gradient(#919191 0%, #757575 5%, #636363 100%);
// border-top: 1px solid #303030;

export default class Split extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    default: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: Math.random(),
      current: props.options[props.default],
      visableSelect: false,
    };
  }

  onSelect(index, option, event) {
    event.preventDefault();
    this.setState({
      current: option,
      visableSelect: false,
    });
  }

  toggleSelect(event) {
    event.preventDefault();
    const { visableSelect } = this.state;
    this.setState({
      visableSelect: !visableSelect,
    });
  }

  render() {
    const {
      props: {
        options, disabled,
      },
      state: {
        id, current, visableSelect,
      },
    } = this;

    return (
      <React.Fragment>
        <Grid columns="1" rows="1" width="1fr 20px">
          <Grid track="1/3 1">
            <Button
              type="button"
              onClick={event => current.onClick(event)}
            >
              {current.label}
            </Button>
          </Grid>
          <Grid track="2/3 1" style={{ zIndex: '0' }}>
            <StyledSelect
              type="button"
              oonClick={event => this.toggleSelect(event)}
              options={options}
              onChange={(value, option, event) => {
                const { selectedIndex  } = event.target;
                // console.log("v:o", value, option,  event.target, selectedIndex);
                this.onSelect(selectedIndex - 1, option, event);
              }}
            />
          </Grid>
        </Grid>
        <ul style={{display: visableSelect ? 'block' : 'none'}}>
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
        </ul>
      </React.Fragment>
    );
  }
}
