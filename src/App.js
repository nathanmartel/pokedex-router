import React, { Component } from 'react';
import Header from './Header.js';
import About from './About.js';
import Home from './Home.js';
import Detail from './Detail.js';
import NotFound from './NotFound.js';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './bootstrap-reboot.min.css';
import './style.css';
import './list.css';

export default class App extends Component {

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/about" component={About} />
          {/* <Route path="/Detail" component={Detail} /> */}
          <Route exact path="/item/:charId" component={Detail} />
          <Route exact path="/page/:pageNum" component={Home} />
          <Route exact path="/:name?" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
