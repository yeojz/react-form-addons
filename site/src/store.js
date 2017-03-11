import {combineReducers, createStore} from 'redux';
import {formReducer} from '../../redux';

const reducers = combineReducers({
  forms: formReducer
});

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
