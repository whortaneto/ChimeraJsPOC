import React, { Component } from 'react';

class List extends Component {
  render() {
      const { children } = this.props;
    return (
      <div>
          {children}
      </div>
    );
  }
}

export default List;
