import React, { Component } from 'react';
import PokeItem from './PokeItem.js';
import request from 'superagent';



export default class Detail extends Component {
  state = { 
    character : {},
  };

  
  async getPokeItem() {
    // Build URL for use with API request
    const dataURL = 'https://alchemy-pokedex.herokuapp.com/api/pokedex';
    // Grab everything in URL after # with built-in hash property and remove hashtag.
    const myQueryString = `pokemon=${this.props.match.params.charId}`;
    const hashedURL = `${dataURL}?${myQueryString}`;
    console.log('Requesting URL: ', hashedURL);
    const data = await request.get(hashedURL);
    this.setState({ character: data.body.results[0] });
  }

  async componentDidMount() {
    console.log('Mounting Detail');
    this.getPokeItem();
  }
   
  
    render() {
        const character = this.state.character;
    return <ul className='data-list'>

        <PokeItem pokemon={ character } /> 
    
    </ul>
    }
}