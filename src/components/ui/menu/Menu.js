import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Grid } from '../../layouts';
import * as Styles from '../styles';

const Hr = styled.hr`
  border-top: 1px solid transparent;
  border-bottom: 1px solid #2c2c2c;
  border-left: 1px;
  border-right: 1px;
  margin: 3px 5px;
`;

const Li = styled.li`
  ${Styles.other.MPR};
  float: left;
`;

const A = styled.a`
  display: block; 
  text-decoration: none;
  color: white;
  text-shadow: 0 -1px 0 black;
`;

const Ulchild = styled.ul`
  ${Styles.other.MPR};
  visibility: hidden;
  position: absolute;
  list-style: none;
  top: 100%; 
  left: 0;
  border: 1px solid #2c2c2c;
  margin-left: -1px;
  background: #6a6a6a;

  & ${Li}  {
    color: #000; 
    float: none;

    & ${A} {
      padding: 5px !important;
    }
  }
`;

const Ul = styled.ul`
  ${Styles.other.MPR};
  ${Styles.other.unselectable};

  position: relative;
  list-style: none;
  font-size: 12px;
  line-height: 12px;

  & ${Li}.rw-is-hover,
  & ${Li}:hover {
    position: relative;
    background: rgba(0,0,0,0.5);

    & > ${Ulchild} {
      ${props => props.active && css`
        visibility: visible;
      `};
    }

    & > ${Ulchild} ${Ulchild} {
      left: 100%; 
      top: 0;
    }
  }
  
  ${Li}  {
    border: 1px solid transparent;
    & ${A} {
      padding: 5px 10px;
    }
  }

  & > ${Li} {
    
    &.rw-is-hover,
    &:hover {
      border: 1px solid #2c2c2c;
      background-image: linear-gradient(#919191 0%, #757575 5%, #636363 100%);
      border-radius: 3px;

      ${props => props.active && css`
        background-image: linear-gradient(#333333 0%, #3f3f3f 5%, #383838 100%);
      `}

      ${Styles.before.border.bottom};
    }

  }
`;

const MenuItem = ({icon, label, shortcut, items}) => ( //eslint-disable-line
  <Grid columns="5" widths="15px auto 15px auto 10px">
    <span>{icon || null}</span>
    <span>{label}</span>
    <span />
    <span>{shortcut || null}</span>
    <span>{items ? <span>&nbsp;›</span> : null }</span>
  </Grid>
);

export default class Menu extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.any,
      shortcut: PropTypes.any,
      icon: PropTypes.any,
      items: PropTypes.arrayOf(PropTypes.object),
    })).isRequired,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    active: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      hover: [],
    };
    this.resetState = this.resetState.bind(this);
  }

  componentWillUnmount() {
    this.resetState();
  }

  onClick(item, parent, event) {
    event.preventDefault();
    event.stopPropagation();

    const {
      props: {
        onClick,
      },
      state: {
        active,
      },
    } = this;

    this.setState({ active: true });

    if (active && parent) this.resetState();
    if (!parent && (!item.items || !item.items.length)) {
      onClick(item, event);
      this.resetState();
    }

    window.addEventListener('click', this.resetState);
  }

  onMouseEnter(index, level) {
    let { hover } = this.state;

    if (level === 0) {
      hover = [index];
    } else if (level === 1) {
      const temphover = [];
      const [first] = hover;
      temphover[0] = first;
      temphover[1] = index;
      hover = temphover;
    } else if (level === 2) {
      hover[2] = index;
    }

    this.setState({ hover });
  }

  onMouseLeave(event) {
    const { active } = this.state;
    if (!active) this.setState({ hover: [] });
  }

  resetState(event) {
    this.setState({
      active: false,
      hover: [],
    });
    window.removeEventListener('click', this.resetState);
  }

  renderItems(items, parent, level, parentHover) {
    const {
      state: {
        hover,
      },
      props: {
        className, // eslint-disable-line
      },
    } = this;

    return items.map((item, index) => (
      <Li
        key={`item-${item.label}`}
        space={item.space}
        onClick={event => this.onClick(item, parent, event)}
        onMouseEnter={() => this.onMouseEnter(index, level)}
        onMouseLeave={event => this.onMouseLeave(event)}
        className={`${parentHover && hover[level] === index ? 'rw-is-hover' : ''} ${className}`}
      >
        { item.space ? <Hr /> : (
          <A href="#item" onClick={event => this.onClick(item, parent, event)}>
            { parent ? item.label : MenuItem(item) }
          </A>
        )}
        { item.items && (
          <Ulchild>
            {
              this.renderItems(
                item.items,
                false,
                level + 1,
                hover[level] === index,
              )
            }
          </Ulchild>
        )}
      </Li>
    ));
  }

  render() {
    const {
      props: {
        items,
      },
      state: {
        active,
      },
    } = this;

    return (
      <React.Fragment>
        <Ul active={active}>
          {this.renderItems(items, true, 0, true)}
        </Ul>
      </React.Fragment>
    );
  }
}
