import React, { Component } from 'react';
import PokeItem from './PokeItem.js';
import request from 'superagent';



export default class Detail extends Component {
  state = { 
    pokeData : {},
    charId : '',
  };

  
  async getPokeItem() {
    // Build URL for use with API request
    const dataURL = 'https://alchemy-pokedex.herokuapp.com/api/pokedex';
    const myQueryString = `${this.props.match.params.charId}`;
    const hashedURL = `${dataURL}/${myQueryString}`;
    console.log('charId is: ', this.props.match.params.charId);
    console.log('Requesting URL: ', hashedURL);
    const data = await request.get(hashedURL);
    this.setState({ pokeData: data.body });
  }

  async componentDidMount() {
    console.log('Mounting Detail');
    this.getPokeItem();
  }
   
  
    render() {
        return <ul className='data-list'>
            <PokeItem pokemon={ this.state.pokeData } /> 
        </ul>
    }
}