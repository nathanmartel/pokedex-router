import React, { Component } from 'react';
import Header from './Header.js';
import PokeList from './PokeList.js';
import SearchBar from './SearchBar.js';
import Pagination from './Pagination.js';
import request from 'superagent';
import './bootstrap-reboot.min.css';
import './style.css';
import './list.css';

export default class App extends Component {
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
    // Grab everything in URL after # with built-in hash property and remove hashtag.
    let myQueryString = window.location.hash.slice(1);
    // console.log('myQueryString: ', myQueryString);
    // i.e.: myQueryString = 'page=3&perPage=2';
    const hashedURL = `${dataURL}?${myQueryString}`;
    console.log('Requesting URL: ', hashedURL);
    const data = await request.get(hashedURL);
    this.setState({ pokeData: data.body.results });
    this.setState({ numberOfResults: data.body.count });
  }

  async componentDidMount() {
    this.getPokeList();
    window.addEventListener("hashchange", () => {
      // Get changed parameters
      const myQueryString = window.location.hash.slice(1);
      const myParams = new URLSearchParams(myQueryString);
      const myParamsPage = Number(myParams.get('page'));
      const myParamsPerPage = Number(myParams.get('perPage'));
      // Update state based on changed parameters
      this.setState({ page: myParamsPage });
      this.setState({ numberOfResultsPerPage: myParamsPerPage });
      this.setState({ maxPages: Math.ceil(this.props.numberOfResults / this.props.numberOfResultsPerPage) })

      this.getPokeList();
    });
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

  setInitialParams() {
    const myQueryString = window.location.hash.slice(1);
    const myParams = new URLSearchParams(myQueryString);
    myParams.set('page', this.state.page);
    myParams.set('perPage', this.state.numberOfResultsPerPage);
    window.location.hash = myParams.toString();
  }

  handleSubmit = (e) => {
    const form = document.getElementById('myForm');
    e.preventDefault();
    const formData = new FormData(form);

    const myQueryString = window.location.hash.slice(1);
    const myParams = new URLSearchParams(myQueryString);

    //myParams.set('type', formData.get('type'));
    const mySearch = formData.get('search');
    myParams.set('pokemon', formData.get('search'));
    console.log('mySearch', mySearch);
    // Reset to page 1 as this is new search and
    myParams.set('page', 1);

    window.location.hash = myParams.toString();
  }

  handleChange = (e) => { 
    this.setState({ searchInput: e.target.value });
  }

  render() {
    return (
      <div>
        {this.setInitialParams()}
        <Header />
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
        {/* <div className="pagination">
          <button onClick={() => this.updatePage(-1)} disabled={this.state.page === 1 ? true : false}>Previous</button>
          <p>Page {this.state.page} of {Math.ceil(this.state.numberOfResults / this.state.numberOfResultsPerPage) }</p>
          <button onClick={() => this.updatePage(1)}>Next</button>
        </div> */}
        <PokeList pokeData={this.state.pokeData} />
      </div>
    );
  }
}
