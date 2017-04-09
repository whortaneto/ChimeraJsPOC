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
      gifsUrls: [
        "https://media.giphy.com/media/Dsr9bhYs0PXry/giphy.gif",
        "https://img.memesuper.com/39698b2c967e1df63d48df070321651d_-tambm-um-travesti-e-uma-meme-jogando-a-mesa-pra-cima_339-223.gif",
        "https://tctechcrunch2011.files.wordpress.com/2015/08/safe_image.gif?w=705"
      ]
    };
  }

  buildRows() {
    return this.state.gifsUrls.map(item => (
      <GifRow
        imageUrl={item}
        editButtonLabel="Edit" deleteButtonLabel="Delete"
      />
    ));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div style={styles.addContainer}>
          <input type="text"/>
          <button style={styles.addContainer.addButton} type="button">add</button>
        </div>
        <List>
          {this.buildRows()}
        </List>
      </div>
    );
  }
}

export default App;
