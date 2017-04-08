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
          <GifRow
            imageUrl="https://media.giphy.com/media/Dsr9bhYs0PXry/giphy.gif"
            editButtonLabel="Edit" deleteButtonLabel="Delete"
          />
          <GifRow
            imageUrl="https://img.memesuper.com/39698b2c967e1df63d48df070321651d_-tambm-um-travesti-e-uma-meme-jogando-a-mesa-pra-cima_339-223.gif"
            editButtonLabel="Editar" deleteButtonLabel="Deletar"
          />
        </List>
      </div>
    );
  }
}

export default App;
