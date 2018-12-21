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
    return (
      <div className="App">
        <Rw.UI.Textarea
          value=""
          placeholder="Edit me..."
          onChange={(value) => console.log(value)} 
        />
      </div>
    );
  }
}

export default App;
