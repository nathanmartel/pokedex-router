import React, { Component } from 'react';

export default class Pagination extends Component {
  
  render() {
    return (
        <div className="pagination">
          <button onClick={() => this.props.updatePage(-1)} disabled={this.props.page === 1 ? true : false}>Previous</button>
          <p>Page {this.props.page} of {this.props.maxPages}</p>
          <button onClick={() => this.props.updatePage(1)} disabled={this.props.page === this.props.maxPages ? true : false}>Next</button>
        </div>
        )
    }
}