import { createStore, combineReducers } from 'redux';

import { home } from './reducers';

const reducers = combineReducers({
  home,
});

const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;