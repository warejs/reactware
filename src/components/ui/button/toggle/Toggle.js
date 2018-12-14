import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import styled, { css } from 'styled-components';

export default class Toggle extends React.Component {
  static propTypes = {
    enabled: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    enabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      enabled: props.enabled,
    };
  }

  onToggle(event) {
    event.preventDefault();
    this.setState({
      enabled: !this.state.enabled,
    });
    this.props.onToggle(!this.state.enabled, event);
  }

  render() {
    const {
      state: {
        enabled,
      },
      props: {
        children,
      }
    } = this;

    //return <ButtonStyled {...rest}>{children}</ButtonStyled>;

    return (
      <Button
        type="button"
        onClick={event => this.onToggle(event)}
        active={enabled}
        accent="primary"
      >
        {children}
        -
        {enabled ? 'on' : 'off'}
      </Button>
    );
  }
}
