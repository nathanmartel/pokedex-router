import React, { Component } from 'react';

export default class Header extends Component {

// this is in progress
  
  render() {
    return (
      <div className="searchBar">
        <form id="myForm" onSubmit={this.props.onSubmit}>
          <input 
            id="search" 
            name="search" 
            type="text" 
            onChange={this.props.onChange}
            value={this.props.searchInput}>
          </input>
          <button type="submit">Search</button>
        </form>
      </div>
    )
    }
}