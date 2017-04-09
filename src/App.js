import React, { Component } from 'react';
import GifRow from './components/presentational/gifRow';
import List from './components/presentational/list';
import logo from './logo.svg';
import './App.css';

const styles = {
  addContainer: {
    marginTop: '25px',
    marginBottom: '25px',
    addButton: {
      marginLeft: '5px'
    }
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      gifsUrls: []
    };
    this.addGifRow = this.addGifRow.bind(this);
  }

  buildRows() {
    return this.state.gifsUrls.map(item => (
      <GifRow
        imageUrl={item}
        editButtonLabel="Edit" deleteButtonLabel="Delete"
      />
    ));
  }

  addGifRow() {
    if (this.urlInput.value) {
      this.state.gifsUrls.push(this.urlInput.value);
      this.urlInput.value = '';
      this.setState(this.state);
    }
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Gif List</h2>
        </div>
        <div style={styles.addContainer}>
          <input type="text" ref={(input) => {this.urlInput = input}} />
          <button style={styles.addContainer.addButton} type="button" onClick={this.addGifRow}>add</button>
        </div>
        <List>
          {this.buildRows()}
        </List>
      </div>
    );
  }
}

export default App;
