import React from 'react';
import PropTypes from 'prop-types';

class Ware extends React.Component {
	constructor(props) {
  	super(props)
  	this.state = {
      leftWidth: 100,
      rightWidth: 200,
      bottomHeight: 200,
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
  
  render() {
  	const { leftWidth, rightWidth, topHeight, bottomHeight, window } = this.state;
  
    return (
      <div className="app">
        <div className="top">
          <div className="sidebar">
            <div className="container">
              <div className="menu"></div>
            </div>
          </div>
        </div>
        <div className="body" style={{ gridTemplateColumns: `minmax(50px, ${leftWidth}px) 1fr minmax(200px, ${rightWidth}px)` }}>
          <div className="left">
            <div className="sidebar">
              <div className="container">
                <div className="panel">
                  <div className="headers">
                  </div>
                  <div className="body"></div>
                </div>
              </div>
            </div>
            <ResizeHandle vertical area="leftWidth" action={this.onMouseDown} />
          </div>
          <div className="mid" style={{ gridTemplateRows: `minmax(30px, ${topHeight}px) 1fr minmax(150px, ${bottomHeight}px)` }}>
            <div className="top">
              <div className="sidebar">
                <div className="container">
                </div>
              </div>
              <ResizeHandle area="topHeight" action={this.onMouseDown} />
            </div>
            <div className="canvas"></div>
            <div className="bottom">
              <ResizeHandle area="bottomHeight" action={this.onMouseDown} />
              <div className="sidebar">
                <PanelGroupContainer>
                  <PanelGroup footer="footer">
                    <Panel name="Console">1</Panel>
                    <Panel name="Timeline">2</Panel>
                  </PanelGroup> 
                </PanelGroupContainer>
              </div>
            </div>
          </div>
          <div className="right">
            <ResizeHandle vertical area="rightWidth" action={this.onMouseDown} />
            <div className="sidebar">
              <PanelGroupContainer>
                <PanelGroup footer="footer">
                  <Panel name="Fonts">1</Panel>
                  <Panel name="Colors">2</Panel>
                  <Panel name="Styles">3</Panel>
                </PanelGroup> 
                <PanelGroup>
                  <Panel name="tet">wow thats awsome!</Panel>
                </PanelGroup>
                <PanelGroup>
                  <Panel name="Car">Cars are awsome and i like them a lot</Panel>
                  <Panel name="Biker">Bike anre fukcing super awsome and <br /><br /><br /><br />aabcasd</Panel>
                </PanelGroup>
              </PanelGroupContainer>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="sidebar">
            <div className="container">
              footer
            </div>
          </div>
        </div>
        <div className="windows" style={{display: 'anone'}}>
          <Window left={25} header="Media player" active={window === 0} onActive={() => this.setState({window: 0})}>
            <PanelGroupContainer>
              <PanelGroup nohandle footer="footer">
                <Panel name="Tablur">1</Panel>
                <Panel name="why">dif</Panel>
              </PanelGroup> 
            </PanelGroupContainer>
           </Window>
           <Window left={189} top={255} header="Sony Vegas" active={window === 1} onActive={() => this.setState({window: 1})}>
            <PanelGroupContainer>
              <PanelGroup nohandle footer="footer5555">
                <Panel name="The title and all">1</Panel>
                <Panel name="dont">dif</Panel>
              </PanelGroup> 
            </PanelGroupContainer>
           </Window>
           <Window left={435} top={32} header="PS1 Emulator" active={window === 2} onActive={() => this.setState({window: 2})}>
            <PanelGroupContainer>
              <PanelGroup nohandle footer="footer">
                <Panel name="Twopsie">1</Panel>
                <Panel name="click me">dif</Panel>
              </PanelGroup> 
            </PanelGroupContainer>
           </Window>
        </div>
      </div>
    );
  }
}