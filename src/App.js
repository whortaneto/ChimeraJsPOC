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
      gifsUrls: [],
      editedRow: undefined
    };
    this.addGifRow = this.addGifRow.bind(this);
    this.deleteGifRow = this.deleteGifRow.bind(this);
    this.editGifRow = this.editGifRow.bind(this);
    this.saveEditRow = this.saveEditRow.bind(this);
    this.editInputRef = this.editInputRef.bind(this);
  }

  buildRows() {
    return this.state.gifsUrls.map(item => (
      <GifRow
        key={item.id}
        imageUrl={item.url}
        isEditing={this.state.editedRow === item.id}
        editButtonLabel="Edit" deleteButtonLabel="Delete"
        saveButtonLabel="Save"
        editInputRef={this.editInputRef}
        deleteButtonOnClick={() => { this.deleteGifRow(item.id)}} 
        editButtonOnClick={() => { this.editGifRow(item.id)}}
        saveButtonOnClick={() => { this.saveEditRow(item.id)}}
      />
    ));
  }

  addGifRow() {
    if (this.urlInput.value) {
      const gifObject = {
        url: this.urlInput.value,
        id: this.state.gifsUrls.length++
      };
      this.state.gifsUrls.push(gifObject);
      this.urlInput.value = '';
      this.setState(this.state);
    }
  }

  saveEditRow(id) {
    if (this.editInput.value) {
      this.state.gifsUrls = this.state.gifsUrls.map(item => {
        if (item.id === id) {
          item.url = this.editInput.value;
        } 
        return item;
      });
      this.editInput.value = '';     
    }
    this.state.editedRow = undefined;
    this.setState(this.state); 
  }

  deleteGifRow(id) {
    this.state.gifsUrls = this.state.gifsUrls.filter(item => item.id !== id);
    this.setState(this.state);
  }

  editGifRow(id) {
    this.state.editedRow = 0;
    this.setState(this.state);
  }

  editInputRef(input) {
    this.editInput = input;
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
