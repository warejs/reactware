import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, createGlobalStyle } from 'styled-components';

import { Context } from '../ui/menu';

function offset(el) {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

const ContextManagerStyle = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0,0,0,0.25);
`

export default class ContextManager extends React.Component {
  static propTypes = {
    menus: PropTypes.object,
    defaultmenu: PropTypes.bool,
  };

  static defaultProps = {
    defaultmenu: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      context: {
        items: [],
        visable: false,
        top: '0px',
        left: '0px',
      },
    };

  }

  handleClick(event) {
    const {
      context: {
        visable,
      },
      context,
    } = this.state;

    // TODO: check if not clicking the context menu itself;
    if (visable) {
      this.setState({
        context: {
          ...context,
          visable: false,
        },
      });
    }
  }

  handleContextMenu(event) {
    console.log('being called?');
    const { context } = this.state;

    console.log("event.target", event.target);
    console.log(event.target.attributes.getNamedItem('contextmenu'));

    // If item has no item context, remove the context item.
    if (!event.target.attributes.getNamedItem('contextmenu')) {
      this.setState({
        context: {
          ...context,
          visable: false,
        },
      });
      return;
    }

    const { menus } = this.props;
    const cid = event.target.attributes.getNamedItem('contextmenu').value;

    try {
      const menu = menus[cid];
      const rwapp = document.getElementById('reactware-app');
      const divOffset = offset(rwapp);
      const top = event.pageY - divOffset.top;
      const left = event.pageX - divOffset.left;

      this.setState({
        context: {
          items: menu,
          visable: true,
          top: `${top}px`,
          left: `${left}px`,
        },
      });
      event.preventDefault();
    } catch (error) {
      console.error(`Context menu "${cid}" doest exist. `, error);
    }
  }

  render() {
    const {
      props: {
        children,
      },
      state: {
        context,
      },
    } = this;

    return (
      <ContextManagerStyle
        onContextMenu={event => this.handleContextMenu(event)}
        onClick={event => this.handleClick(event)}
      >
        {children}
        <Context {...context} />
      </ContextManagerStyle>
    );
  }
}
