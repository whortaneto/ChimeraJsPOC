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
    const { imageUrl, editButtonLabel, deleteButtonLabel } = this.props;
    return (
      <div style={styles.container}>
        <img src={imageUrl} height="300" width="300"/>
        <div style={styles.container.buttonsContainer}>
          <button type="button">{editButtonLabel}</button>
          <button type="button">{deleteButtonLabel}</button>
        </div>
      </div>
    );
  }
}

export default GifRow;
