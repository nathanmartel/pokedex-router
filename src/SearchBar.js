import React, { Component } from 'react';

export default class SearchBar extends Component {
  
  render() {
    return (
      <div className="searchBar">
        <form id="myForm" onSubmit={this.props.onSubmit}>
          <input 
            id="search" 
            name="search" 
            type="text" 
            onChange={this.props.onSearchChange}
            value={this.props.searchInput} />
          
          {/* <label>By Name
          <input
            id="radio-name"
            name="type"
            type="radio"
            onClick={this.props.onRadioChange}
            value="pokemon" 
            defaultChecked />
          </label>
          
          <label>By Attack
            <input
            id="radio-type"
            name="type"
            type="radio"
            onClick={this.props.onRadioChange}
            value="attack" />
          </label> */}

          <button type="submit">Search</button>
        </form>
      </div>
    )
    }
}