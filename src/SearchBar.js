import React, { Component } from 'react';

export default class SearchBar extends Component {
  
  render() {
    return (
      <div className="searchBar">
        <form id="myForm" onSubmit={this.props.onSubmit}>

          <div className="search-field">
            <input 
              id="search" 
              name="search" 
              type="text" 
              onChange={this.props.onSearchChange}
              value={this.props.searchInput} />

            <button type="submit">Search</button>
          </div>
          
          <div className="radio-buttons">

            <input
              id="radio-pokemon"
              name="type"
              type="radio"
              onClick={this.props.onRadioChange}
              value="pokemon" 
              defaultChecked />
            <label htmlFor="radio-name">By Name</label>
            
            <input
            id="radio-type"
            name="type"
            type="radio"
            onClick={this.props.onRadioChange}
            value="type" />
            <label htmlFor="radio-name">By Type</label>
            
            <input
            id="radio-attack"
            name="type"
            type="radio"
            onClick={this.props.onRadioChange}
            value="attack" />
            <label htmlFor="radio-name">Minimum Attack</label>
          </div>

        </form>
      </div>
    )
    }
}