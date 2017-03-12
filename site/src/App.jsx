import React from 'react';
import {scrollSpy} from 'react-scroll';
import Navigation from './scaffolding/Navigation';

import BranchExample from './components/BranchExample';
import CollectionExample from './components/CollectionExample';
import ComposeExample from './components/ComposeExample';
import ListExample from './components/ListExample';
import SyntheticFormEventExample from './components/SyntheticFormEventExample';
import WithPropsExample from './components/WithPropsExample';
import WithReduxStateExample from './components/WithReduxStateExample';
import WithSideEffectsExample from './components/WithSideEffectsExample';
import WithStateExample from './components/WithStateExample';
import WithValidationExample from './components/WithValidationExample';

class App extends React.Component {
  componentDidMount = () => {
    scrollSpy.update();
  }

  render() {
    return (
        <div className='app'>
          <div className='columns'>
            <Navigation />

            <div className='column is-10 is-offset-2'>
              <h2>API</h2>
              <ComposeExample />
              <WithPropsExample />
              <WithStateExample />
              <WithSideEffectsExample />
              <WithValidationExample />
              <BranchExample />
              <ListExample />
              <CollectionExample />
              <WithReduxStateExample />
              <SyntheticFormEventExample />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
