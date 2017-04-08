import React, { Component } from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}

class List extends Component {
  render() {
      const { children } = this.props;
    return (
      <div style={styles.container}>
          {children}
      </div>
    );
  }
}

export default List;
