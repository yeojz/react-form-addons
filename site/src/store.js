import {combineReducers, createStore} from 'redux';
import {reducer as formReducer} from '../../lib/redux';

const reducers = combineReducers({
  forms: formReducer
});

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
