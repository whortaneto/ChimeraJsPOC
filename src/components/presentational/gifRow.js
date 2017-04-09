import React, { Component } from 'react';

const styles = {
  container: {
    borderStyle: "solid",
    borderWidth: "1px",
    marginBottom: "20px",
    display: "flex",
    padding: "20px",
    justifyContent: "space-around",
    width: "60%",
    buttonsContainer: {
      display: "flex",
      flexDirection: 'column',
      justifyContent: "space-around"
    }
  }
}

class GifRow extends Component {
  render() {
    const {
      imageUrl,
      isEditing,
      editButtonLabel,
      deleteButtonLabel,
      saveButtonLabel,
      deleteButtonOnClick,
      editButtonOnClick,
      saveButtonOnClick,
      editInputRef
    } = this.props;
    return (
      <div style={styles.container}>
        {
          isEditing ? 
          <input type="text" ref={editInputRef} />
          :
          <img src={imageUrl} height="300" width="300"/>
        }
        <div style={styles.container.buttonsContainer}>
        {
          isEditing ? 
          <button type="button" onClick={saveButtonOnClick}>{saveButtonLabel}</button>
          :
          <button type="button" onClick={editButtonOnClick}>{editButtonLabel}</button>
        }
          <button type="button" onClick={deleteButtonOnClick}>{deleteButtonLabel}</button>
        </div>
      </div>
    );
  }
}

export default GifRow;
