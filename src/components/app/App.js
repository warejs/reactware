import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, createGlobalStyle } from 'styled-components';

import { normalize } from './Normalize';
import ContextManager from './ContextManager';
import WindowManager from './WindowManager';

import ResizeHandle from '../ui/window/ResizeHandle';
import { Tabs } from '../ui';
import { Menu } from '../ui/menu';

const Normalize = createGlobalStyle` /*extends*/ ${normalize}
  #reactware-app {
    font-family: 'Source Sans Pro',Helvetica,sans-serif;
    background: #606060;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
`;

const AppStyled = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const TopStyled = styled.div`
  z-index: 99999999999999999999999999999999999999999;
`;

const BodyStyled = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 200px;
  grid-template-rows: 1fr;
  background: #3a3a3a;
  margin: 2px;
  border: 1px solid #282828;
`;

const SidebarStyled = styled.div`
  background: #535353;
  padding: 3px;
`;

const LeftStyled = styled.div`
  grid-template-columns: 1fr 5px;
  display: grid;
`;

const RightStyled = styled.div`
  grid-template-columns: 5px 1fr;
  display: grid;
`;

const MinStyled = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr 200px;
`;

const MinTopStyled = styled.div`
  grid-template-rows: 1fr 5px;
`;

const MinCanvasStyled = styled.div`
  background: url(https://wallpaperbrowse.com/media/images/1159701.jpg) 100% center no-repeat;
  background-size: cover;
  border: 10px solid #303030;
}
`;



const MinBottomStyled = styled.div`
  grid-template-rows: 5px 1fr;
  display: grid;
`;




export default class App extends React.Component {
  static propTypes = {
    menus: PropTypes.object,
    windows: PropTypes.array,
  };

  static defaultProps = {
    menus: {},
    windows: [],
  };

  constructor(props) {
  	super(props);
  	this.state = {
      leftWidth: 50,
      rightWidth: 200,
      bottomHeight: 143,
      topHeight: 30,
      window: 1,
      area: null,
      clientY: null,
      clientX: null,
    }
    
    this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }
  
  onMouseMove(event) {
  	console.log('onMouseMove', event)
    const { area } = this.state;
  	const { clientY, clientX } = event;
  	let heightMoved = this.state[area] + (clientY - this.state.clientY);
    let widthMoved = this.state[area] + (clientX - this.state.clientX);
  	switch(area) {
    	case 'bottomHeight':
      	heightMoved = this.state[area] - (clientY - this.state.clientY);
      case 'topHeight':
      	this.setState({ 
          [area]: heightMoved,
          clientY,
        });
        break;
      case 'rightWidth':
      	widthMoved = this.state[area] - (clientX - this.state.clientX);
     	case 'leftWidth':
      	this.setState({ 
          [area]: widthMoved,
          clientX,
        });
        break;
      default:
        break;
    }
  }
  
  onMouseUp(event) {
  	console.log('onMouseUp', event)
  	window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
  }
  
  onMouseDown(event, area) {
  	console.log('onMouseDown', event)
  	const { clientY, clientX } = event;
  	window.addEventListener("mouseup", this.onMouseUp);
    window.addEventListener("mousemove", this.onMouseMove);
    this.setState({ 
    	clientY, 
      clientX,
      area,
    });
  }

  paneltabs(containers){
    return (
      containers.map((container, index) => (
        <SidebarStyled key={index}>
          {container.groups.panels.map((panels, index) => (
            <div key={index}>
              <Tabs items={panels} />
            </div>
          ))}
        </SidebarStyled>
      ))
    )
  }

  render() {
    const {
      props: {
        children,
        windows,
        menus,
        menu,
        containers,
      },
      state: {
        leftWidth, 
        rightWidth, 
        topHeight, 
        bottomHeight
      }
    } = this;

    // const containers = {
    //   left: [
    //     {
    //       panels: [
    //         [ panel1, panel2 ],
    //         [ panel3, panel4, panel4 ]
    //       ]
    //     },
    //   ],
    //   right: [],
    //   bottom: [],
    // };

    console.log('containers', containers)

    return (
      <div id="reactware-app">
        <Normalize />
        <ContextManager menus={menus}>
          {children}


          <AppStyled>
            <TopStyled>
              <SidebarStyled>
                <Menu items={menu} />
              </SidebarStyled>
            </TopStyled>
            <BodyStyled style={{ gridTemplateColumns: `minmax(50px, ${leftWidth}px) 1fr minmax(200px, ${rightWidth}px)` }}>
              <LeftStyled>
                {this.paneltabs(containers.left)}
                <ResizeHandle E area="leftWidth" onMouseDown={this.onMouseDown} />
              </LeftStyled>
              <MinStyled style={{ gridTemplateRows: `minmax(30px, ${topHeight}px) 1fr minmax(150px, ${bottomHeight}px)` }}>
                <MinTopStyled>
                  {this.paneltabs(containers.top)}
                  <ResizeHandle area="topHeight" onMouseDown={this.onMouseDown} />
                </MinTopStyled>
                <MinCanvasStyled></MinCanvasStyled>
                <MinBottomStyled>
                  <ResizeHandle  area="bottomHeight" onMouseDown={this.onMouseDown} />
                  {this.paneltabs(containers.bottom)}
                </MinBottomStyled>
              </MinStyled>
              <RightStyled>
                <ResizeHandle E area="rightWidth" onMouseDown={this.onMouseDown} />
                {this.paneltabs(containers.right)}
              </RightStyled>
            </BodyStyled>
            <div className="footer">
              <SidebarStyled>
                <div className="container">
                  footer
                </div>
              </SidebarStyled>
            </div>
          </AppStyled>



          <WindowManager windows={windows} />
        </ContextManager>
      </div>
    );
  }
}
