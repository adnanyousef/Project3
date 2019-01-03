import { h, Component } from 'preact';
import { Router } from 'preact-router';
import axios from 'axios';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Profile from '../routes/profile';

export default class App extends Component {
  state = { counter: 0 };

  componentDidMount() {
    axios
      .get('http://localhost:3001/')
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  increment = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    return (
      <div id="app">
        <Header />
        <div>
          <h4>Counter: {this.state.counter}</h4>
          <button onClick={this.increment}>Increment</button>
        </div>
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Profile path="/profile/" user="me" />
          <Profile path="/profile/:user" />
        </Router>
      </div>
    );
  }
}
