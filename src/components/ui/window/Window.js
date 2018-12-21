import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import ResizeHandle from './ResizeHandle';

import * as Styles from '../styles';

const WindowStyle = styled.div`
  ${Styles.font.size}
  ${Styles.other.unselectable}
 
  display: flex;
  flex-direction: column;
  position: absolute;

  box-shadow: 0px 0px rgba(0,0,0,0);
  transition: box-shadow 200ms;

  ${props => props.active && css`
    box-shadow: 0px 0px 5px rgba(0,0,0,0.25);
  `}

  ${props => !props.active && css`
    -filter: blur(1px);
    opacity: 1;
  `}

`;

const HeaderStyle = styled.div`
  ${Styles.font.size};
  padding: 3px 5px;
  grid-area: head; 
  background:gray;
  border: 1px solid #282828;
  border-bottom: 0;
  background-image: linear-gradient(#474747 0%, #393939 5%, #323232 100%);
  color: white;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

const BodyStyle = styled.div`
  grid-area: head; 
  grid-area: body; 
  background: #535353;
  border: 1px solid #282828;
  border-top: 0;
  height: 100%;
  display: flex;
`;

const ResizeStyled = styled.div`
  width: 4px;
  height: 4px;

  ${props => props.area && css`
    position: absolute;
  `}

  ${props => props.area === 'left' && css`
    height: 100%;
    top: 0;
    left: -1px;
    &:active {  ${Styles.other.fullwidth} }
  `}

  ${props => props.area === 'left-bottom' && css`
    width: 4px;
    height: 4px;
    position: absolute;
    top: 100%;
    margin-top: -2px;
    margin-left: -1px;
    &:active {  ${Styles.other.fullwidth} }
  `}

  ${props => props.area === 'bottom' && css`
    top: 100%;
    width: 100%;
    margin-top: -2px;
    &:active {  ${Styles.other.fullwidth} }
  `}

  ${props => props.area === 'right-bottom' && css`
    width: 4px;
    height: 4px;
    position: absolute;
    top: 100%;
    right: 0px;
    margin-top: -2px;
    margin-right: -1px;
    &:active {  ${Styles.other.fullwidth} }
  `}

  ${props => props.area === 'right' && css`
    height: 100%;
    top: 0;
    right: -1px;
    &:active {  ${Styles.other.fullwidth} }
  `}

  ${props => props.direction && css` 
    cursor: ${props.direction}-resize; 
  `}

`;

const FocusStyled = styled.div`
  ${props => !props.active && css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `}
`;

export default class Window extends React.Component {
  static propTypes = {
    top: PropTypes.number,
    left: PropTypes.number,
    width: PropTypes.number,
    minwidth: PropTypes.number,
    maxwidth: PropTypes.number,
    height: PropTypes.number,
    minheight: PropTypes.number,
    maxheight: PropTypes.number,
    index: PropTypes.number.isRequired,
    active: PropTypes.bool,
    header: PropTypes.any, //eslint-disable-line
    children: PropTypes.any, //eslint-disable-line
    onClick: PropTypes.func,
  };

  static defaultProps = {
    top: 50,
    left: 50,
    width: 350,
    minwidth: 150,
    maxwidth: 400,
    height: 200,
    minheight: 150,
    maxheight: 300,
    active: false,
    header: null,
    children: null,
    onClick: () => {},
  };


  constructor(props) {
    super(props);
    this.state = {
      top: props.top,
      left: props.left,
      width: props.width,
      height: props.height,
      area: null,
      clientY: null,
      clientX: null,
    };

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  onMouseMove(event) {
    const {
      area,
      top,
      left,
      right,
      height,
      width,
      clientX: SclientX,
      clientY: SclientY,
    } = this.state;

    const {
      minheight, maxheight, minwidth, maxwidth,
    } = this.props;

    const { clientY, clientX } = event;

    switch (area) {
      case 'left': {
        const tleft = left + (clientX - SclientX);
        const twidth = width - (clientX - SclientX);
        
        if (twidth <= minwidth) {
          this.setState({
            left: left + (width - minwidth),
            width: minwidth,
          });
          break;
        }
        if (maxwidth && twidth >= maxwidth) {
          this.setState({
            left: left + (width - maxwidth),
            width: maxwidth,
          });
          break;
        }
        this.setState({
          left: tleft,
          width: twidth,
          clientX,
        });
        break;
      }
      case 'right': {
        const twidth = width + (clientX - SclientX);
        if (twidth <= minwidth) {
          this.setState({
            width: minwidth,
          });
          break;
        }
        this.setState({
          width: width + (clientX - SclientX),
          clientX,
        });
        break;
      }
      case 'bottom': {
        const theight = height + (clientY - SclientY);
        if (theight <= minheight) {
          this.setState({ height: minheight });
          break;
        }
        if (maxheight && theight >= maxheight) {
          this.setState({ height: maxheight });
          break;
        }
        this.setState({
          height: theight,
          clientY,
        });
        break;
      }
      case 'left-bottom': {
        const tleft = left + (clientX - SclientX);
        const twidth = width - (clientX - SclientX);
        const theight = height + (clientY - SclientY);

        let state = {};

        if (twidth <= minwidth) {
          state = {
            left: left + (width - minwidth),
            width: minwidth,
          };
        } else if (maxwidth && twidth >= maxwidth) {
          state = {
            left: left + (width - maxwidth),
            width: maxwidth,
          };
        } else {
          state = {
            left: tleft,
            width: twidth,
            clientX,
          };
        }

        if (theight <= minheight) {
          state = {
            ...state,
            height: minheight,
          };
        } else if (maxheight && theight >= maxheight) {
          state = {
            ...state,
            height: maxheight,
          };
        } else {
          state = {
            ...state,
            height: theight,
            clientY,
          };
        }

        if (state) {
          this.setState({ ...state });
          break;
        }

        this.setState({
          left: left + (clientX - SclientX),
          width: width - (clientX - SclientX),
          height: height + (clientY - SclientY),
          clientX,
          clientY,
        });
        break;

      }
      case 'right-bottom': {
        const twidth = width + (clientX - SclientX);
        const theight = height + (clientY - SclientY);

        let state = {};

        if (twidth <= minwidth) {
          state = {
            width: minwidth,
          };
        } else if (maxwidth && twidth >= maxwidth) {
          state = {
            width: maxwidth,
          };
        } else {
          state = {
            width: twidth,
            clientX,
          };
        }

        if (theight <= minheight) {
          state = {
            ...state,
            height: minheight,
          };
        } else if (maxheight && theight >= maxheight) {
          state = {
            ...state,
            height: maxheight,
          };
        } else {
          state = {
            ...state,
            height: theight,
            clientY,
          };
        }

        if (state) {
          this.setState({ ...state });
          break;
        }

        this.setState({
          width: width + (clientX - SclientX),
          height: height + (clientY - SclientY),
          clientX,
          clientY,
        });
        break;
      }
      case 'header':
        this.setState({
          left: left + (clientX - SclientX),
          top: top + (clientY - SclientY),
          clientX,
          clientY,
        });
        break;

      default:
        break;
    }
  }

  onMouseUp(event) {
    // console.log('onMouseUp', event)
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown(event, area) {
    // console.log('onMouseDown', event)
    const { onClick } = this.props;
    const { clientY, clientX } = event;
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
    this.setState({
      clientY,
      clientX,
      area,
    });
    onClick();
  }
  

  render() {
    const {
      props: {
        index,
        active,
        header,
        children,
      },
      state: {
        width,
        height,
        top,
        left,
      },
    } = this;

    return (
      <WindowStyle
        active={active}
        style={{
          width,
          height,
          top,
          left,
          zIndex: index,
        }}
      >
        <HeaderStyle onMouseDown={event => this.onMouseDown(event, 'header')}>
          {header}
        </HeaderStyle>
        <BodyStyle>{children}</BodyStyle>

        <ResizeStyled
          area="left"
          direction="e"
          onMouseDown={event => this.onMouseDown(event, 'left')}
        />
        <ResizeStyled
          area="bottom"
          direction="n"
          onMouseDown={event => this.onMouseDown(event, 'bottom')} 
        />
        <ResizeStyled
          area="left-bottom"
          direction="ne"
          onMouseDown={event => this.onMouseDown(event, 'left-bottom')} 
        />
        <ResizeStyled
          area="right"
          direction="e"
          onMouseDown={event => this.onMouseDown(event, 'right')}
        />
        <ResizeStyled
          area="right-bottom"
          direction="nw"
          onMouseDown={event => this.onMouseDown(event, 'right-bottom')} 
        />

        <FocusStyled
          active={active}
          onMouseDown={event => this.onMouseDown(event, 'header')} 
        />
      </WindowStyle>
    );
  }
}
