import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import MainContainer from './components/MainContainer';
import store from './store';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer />
      </Provider>
    );
  }
}
export default App;
