import React, { Component } from 'react';
import PokeItem from './PokeItem.js';
import { Link } from 'react-router-dom';
import Pagination from './Pagination.js';
import SearchBar from './SearchBar.js';
import request from 'superagent';



export default class Home extends Component {
  state = { 
    dataURL: 'https://alchemy-pokedex.herokuapp.com/api/pokedex',
    pokeData: [],
    page: 1,
    numberOfResult: 0,
    numberOfResultsPerPage: 20,
    maxPages: 0,
    searchInput: '',
    searchType: 'pokemon',
  };

  
  async getPokeList() {
    
    // Build URL for use with API request
    const dataURL = this.state.dataURL;
    // let myPage;
    // if (this.state.match.params.pageNum !== undefined) {
    //   myPage = this.state.match.params.pageNum }
    //   else myPage = 1; 
    const myQueryType = this.state.searchType;
    const myQueryString = this.state.searchInput;
    const hashedURL = `${dataURL}?${myQueryType}=${myQueryString}`;
    console.log('Requesting URL: ', hashedURL);
    const data = await request.get(hashedURL);
    this.setState({ pokeData: data.body.results });
    this.setState({ numberOfResults: data.body.count });
    this.setState({ maxPages: Math.ceil(this.state.numberOfResults / this.state.numberOfResultsPerPage) });
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
    // window.location.hash = myParams.toString();
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.getPokeList();
    this.props.history.push(this.state.searchInput);
  }

  handleSearchChange = (e) => { 
    this.setState({ searchInput: e.target.value });
  }

  handleRadioClick = (e) => { 
    this.setState({ searchType: e.target.value });
    console.log('Radio: ', e.target.value);
  }
  
    render() {
    return <div>
      <SearchBar 
          searchInput={this.state.searchInput} 
          onSearchChange={this.handleSearchChange}
          onSubmit={this.handleSubmit} 
          onRadioChange={this.handleRadioClick} 
        />
      <Pagination
      page = {this.state.page} 
      numberOfResults = {this.state.numberOfResults} 
      numberOfResultsPerPage = {this.state.numberOfResultsPerPage}
      maxPages = {this.state.maxPages}
      updatePage = {this.updatePage} 
      />
      <ul className='data-list'>
        { this.state.pokeData.map(item => <PokeItem pokemon={item} key={item._id} />) } 
      </ul>
      {/* <PokeList pokeData={this.state.pokeData} />  */}
    
    </div>
    }
}