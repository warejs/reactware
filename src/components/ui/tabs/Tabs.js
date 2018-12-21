import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import * as Styles from '../styles';

const A = styled.a`
  ${Styles.font.size}

  cursor: pointer;
  text-decoration: none;
  color: #7fa9d2;
  text-shadow: 0 -1px 0 black;
  
  &:visited {
    color: #7fa9d2;
  }

  &:hover {
    color: #71a0cf;
  }

  &:active {
    color: #95bfea;
  }
`;

// export default class Tabs extends React.Component {
//   static propTypes = {
//     to: PropTypes.string,
//     onClick: PropTypes.func,
//   };

//   static defaultProps = {
//     to: null,
//     onClick: () => {},
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

//   onClick(event) {
//     const { onClick, to } = this.props;
//     if (!to) event.preventDefault();
//     onClick(event);
//   }

//   render() {
//     const {
//       props: {
//         children, to, ...rest
//       },
//     } = this;

//     // <PanelGroupContainer>
//     //   <PanelGroup footer="footer">
//     //     <Panel name="Fonts">1</Panel>
//     //     <Panel name="Colors">2</Panel>
//     //     <Panel name="Styles">3</Panel>
//     //   </PanelGroup>
//     // </PanelGroupContainer>

//     return (
//       <A
//         onClick={event => this.onClick(event)}
//         target="_blank"
//         href={to}
//         {...rest}
//       >
//         {children}
//       </A>
//     );
//   }
// }

// const Panel = (props) => (
// 	<div className="panel-body">
// 	  {props.children}
// 	</div>
// );


// const ResizeHandle = (props) => {
// 	const { vertical, NE, NW,  area, action,  ...rest } = props;
//   const text = NE ? "·" : ((NW) ? '·' : (vertical ? '⋮' : '···'));
//   const className = NE ? "ne" : ((NW) ? 'nw' : (vertical ? 'vertical' : ''));
  
//   return (
//     <div
//       className={`resize area-${area} ${className}`} 
//       onMouseDown={(event) => action(event, area)}
//       {...rest}
//     > 
//       { text }  
//     </div>
//   ); 
// }

const Container = styled.div`
  ${Styles.font.size}

  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;

  background: #535353;
  border: 1px solid #282828;
`;


// ${props => props.spaced && css`
//   display: grid;
//   grid-auto-flow: column;
//   grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));
// `}

const Headers = styled.div`
  display: grid;
  grid-auto-flow: column;

  ${props => css`
    grid-template-columns: ${props.items.map((item, index) => ((index === props.active) ? 'minmax(max-content,max-content) ' : 'minmax(10px, min-content) '))};
  `}

  ${props => props.spaced && css`
    grid-template-columns: ${props.items.map((item, index) => ((index === props.active) ? 'minmax(max-content,1fr) ' : '1fr '))};
  `}

  background-image: linear-gradient(#4a4a4a 0%,#3c3c3c 10%,#373737 90%,#020202 95%, #e0e0e0 100%);
`;

const Header = styled.div`
  ${Styles.other.unselectable};

  position: relative;
  padding: 3px 7px;
  color: rgba(255,255,255, 0.5);
  border-right: 1px solid #282828;
  display: inline-block;
  cursor: default;
  white-space: nowrap;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;

  border-top: 1px solid transparent;
  border-bottom: 2px solid transparent;

  ${props => props.spaced && css`
    &:last-child {
      border-right: 1px solid transparent;
    }
  `};
  
  ${props => props.active && css`
    background: #535353;
    color: white;
    border-bottom: 2px solid transparent;
    border-top: 1px solid #6a6a6a;
  `}

`;

const Body = styled.div`
  min-height: 100px;
  padding: 5px;
  overflow-y: auto;
  background: #535353;
`;

export default class Tabs extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.any,
      content: PropTypes.any,
    })).isRequired,
    active: PropTypes.number,
    spaced: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    active: 0,
    spaced: false,
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { active } = this.props;
    if (nextProps.active !== active) {
      this.setState({ active: nextProps.active });
    }
  }

  onClick(index, item, event) {
    const { onChange } = this.props;
    this.setState({ active: index })
    onChange(index, item, event);
  }

  render() {
    const {
      props: {
        items, spaced,
      },
      state: {
        active,
      },
    } = this;

    return (
      <Container>
        <Headers spaced={spaced} active={active} items={items}>
          {
            items.map((item, index) => (
              <Header
                key={`header-${item.label}`}
                onClick={event => this.onClick(index, item, event)}
                active={index === active}
                spaced={spaced}
              >
                {item.label}
              </Header>
            ))
          }
        </Headers>
        <Body>
          {items[active] && items[active].content}
        </Body>
      </Container>
    );
  }
}
