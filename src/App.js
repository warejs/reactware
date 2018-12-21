import React, { Component } from 'react';

/** This just is a file playground for this app. */

import * as Rw from './components';

console.log("RW-> ", Rw);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const contextMenus = {
      'a-1': [
        { label: 'File' },
        {
          label: 'Start',
          items: [
            { label: 'Select' },
            { label: 'Maybe' },
            { label: 'Dont' },
          ],
        },
      ],
      'b-1': [
        { label: 'One' },
        { label: 'Two' },
        { label: 'Tree' },
        { label: 'Four' },
        { label: 'Five' },
      ],
    };

    return (
      <Rw.App
        containers={{
          right: [{
            groups: {
              panels: [
                [ { label: 'Actions'}, { label: 'Events'} ],
                [ { label: 'Colors'}, { label: 'Ajustments'}, { label: 'Channels'} ],
                [ { label: 'Layers'} ]
              ],
            },
          }],
          left: [{
            groups: {
              panels: [
                [ { label: 'Utils'} ],
              ],
            }
          }],
          bottom: [{
            groups: {
              panels: [
                [ { label: 'Timeline'}, { label: 'Frames'} ],
              ],
            }
          }],
          top: [],
        }}
        menu={[
          { label: 'File', items: [
            { label: 'Save' }, 
          ] },
          { label: 'Edit', items: [
            { label: 'Undo', shortcut: "CTRL+Z" },
            { label: 'Other', items: [
              { label: 'Cut' }, 
              { label: 'Paste', icon: "✓", shortcut: "CTRL+V" }, 
              { label: 'Select', items: [
                { label: 'All' },
                { label: 'Active', icon: "✓" },
              ]}
            ]},
            { label: 'Find' }, 
            { label: 'Replace' },
            { space: true },
            { label: 'Toggle', items: [
              { label: 'On' }, 
              { label: 'Off' },
              { label: 'Auto' },
            ] }, 
            { label: 'Exit' }, 
          ]},
          { label: 'Selection', items: [ { label: 'Other' }] },
          { label: 'View', items: [{ label: 'Panel' }] },
          { label: 'Help', items: [{ label: 'About' }] },
        ]}
        windows={[
          { header: 'Settings', top: 88, left: 250},
          { header: 'Actions', left: 145, top: 144, },
          { header: 'Layers', minwidth: 50, top: 315, left: 150, width: 150 },
        ]}
      >
      </Rw.App>
    );
  }
}

export default App;
