import React, { Component } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import styled, { css, StyleSheetManager } from 'styled-components';

const FrameStyled = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

export default class Frame extends Component {
  componentDidMount() {
    this.iframeHead = this.node.contentDocument.head;
    this.iframeRoot = this.node.contentDocument.body;
    this.forceUpdate();
  }

  render() {
    const { children, head, ...rest } = this.props;
    return (
      <FrameStyled {...rest} title="frame" ref={(node) => (this.node = node)}>
        {this.iframeRoot && (
          <StyleSheetManager target={this.iframeHead}>
            <React.Fragment>
              {ReactDOM.createPortal(head, this.iframeHead)}
              {ReactDOM.createPortal(children, this.iframeRoot)}
            </React.Fragment>
          </StyleSheetManager>
        )}
      </FrameStyled>
    );
  }
}
