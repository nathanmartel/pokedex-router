import React, { Component } from 'react';
import PokeItem from './PokeItem.js';
import { Link } from 'react-router-dom';
import Pagination from './Pagination.js';
import SearchBar from './SearchBar.js';
import request from 'superagent';



export default class Home extends Component {
  state = { 
    pokeData: [],
    page: 1,
    numberOfResult: 0,
    numberOfResultsPerPage: 10,
    maxPages: 0,
    searchInput: '',
  };

  
  async getPokeList() {
    // Build URL for use with API request
    const dataURL = 'https://alchemy-pokedex.herokuapp.com/api/pokedex';
    // let myQueryString = this.state.match.params;
    let myQueryString = '';
    const hashedURL = `${dataURL}?${myQueryString}`;
    console.log('Requesting URL: ', hashedURL);
    const data = await request.get(hashedURL);
    this.setState({ pokeData: data.body.results });
    this.setState({ numberOfResults: data.body.count });
  }

  async componentDidMount() {
    console.log('Mounting Home');
    this.getPokeList();
  }
   
  updatePage(numberOfPages) {
    // Get existing parameters
    const myQueryString = window.location.hash.slice(1);
    const myParams = new URLSearchParams(myQueryString);
    const myParamsPage = Number(myParams.get('page'));
    // Modify parameters and use hash property to change only relevant parts of local URL
    const newPage = myParamsPage + numberOfPages;
    myParams.set('page', newPage);
    // Update URL and trigger hashchange event
    window.location.hash = myParams.toString();
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${this.state.searchInput}`);
    this.setState({pokeData: data.body.results});
  }

  handleChange = (e) => { 
    this.setState({ searchInput: e.target.value });
  }
  
    render() {
    return <div>
      {/* {this.setInitialParams()} */}
      <SearchBar 
          searchInput={this.state.searchInput} 
          onChange={this.handleChange}
          onSubmit={this.handleSubmit} 
        />
      <Pagination
      page = {this.state.page} 
      numberOfResults = {this.state.numberOfResults} 
      numberOfResultsPerPage = {this.state.numberOfResultsPerPage}
      maxPages = {this.state.maxPages}
      updatePage = {this.updatePage} 
      />
      <div class="menu">
        <Link to="/">Home</Link>
        <span> | </span>
        <Link to="/About">About</Link>
      </div>
      <ul className='data-list'>
        { this.state.pokeData.map(item => <PokeItem pokemon={ item } />) }; 
      </ul>
      {/* <PokeList pokeData={this.state.pokeData} />  */}
    
    </div>
    }
}