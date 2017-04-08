import React, { Component } from 'react';
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
          <p> Olha Carol </p>
          <p> Olha Carol </p>
          <p> Olha Carol </p>
          <p> Olha Carol </p>
          <p> Olha Carol </p>
        </List>
      </div>
    );
  }
}

export default App;
