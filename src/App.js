import React, { Component } from 'react';

/** This just is a file playground for this app. */

import * as Rw from './components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Rw.Layouts.Flex horizontal>
          <div>One</div>
          <Rw.Layouts.Flex auto>Two</Rw.Layouts.Flex>
          <div>Three</div>
        </Rw.Layouts.Flex>
      </div>
    );
  }
}

export default App;
