import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, createGlobalStyle } from 'styled-components';

import { Window } from '../ui';

export default class WindowManager extends React.Component {
  static propTypes = {
    windows: PropTypes.object,
    active: PropTypes.number,
    indexs: PropTypes.array,
  };

  static defaultProps = {
    windows: [],
    active: 0,
    indexs: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
      indexs: props.indexs || props.windows.map((w, index) => index + 1),
      count: props.windows.length,
    };
  }

  onClick(index) {
    const { indexs, count } = this.state;
    indexs[index] = count;

    this.setState({
      active: index,
      indexs,
      count: count + 1,
    });
  }

  render() {
    const {
      props: {
        windows,
      },
      state: {
        indexs, active,
      },
    } = this;
    return windows.map((props, index) => (
      <Window
        onClick={() => this.onClick(index)}
        index={indexs[index]}
        active={active === index}
        {...props}
      />
    ));
  }
}
