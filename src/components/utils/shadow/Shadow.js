import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default class Frame extends Component {
  static propTypes = {
    mode: PropTypes.string,
  }

  static defaultProps = {
    mode: 'open',
  }

  componentDidMount() {
    this.shadowRoot = this.node.attachShadow({ mode: this.props.mode });
    this.forceUpdate();
  }

  render() {
    const { children, ...rest } = this.props;
    return (
      <div {...rest} ref={node => (this.node = node)}>
        {this.shadowRoot && ReactDOM.createPortal(children, this.shadowRoot)}
      </div>
    );
  }
}
