import React from 'react';
import {scrollSpy} from 'react-scroll';
import Navigation from './scaffolding/Navigation';

import BranchForm from './components/BranchForm';
import CollectionFrom from './components/CollectionForm';
import Composition from './components/Composition';
import PropsForm from './components/PropsForm';
import SideEffectForm from './components/SideEffectForm';
import StatefulForm from './components/StatefulForm';
import SyntheticFormEvent from './components/SyntheticFormEvent';
import ValidationForm from './components/ValidationForm';


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
              <h2>Methods</h2>
              <Composition />
              <PropsForm />
              <StatefulForm />
              <SideEffectForm />
              <ValidationForm />
              <BranchForm />
              <CollectionFrom />
              <SyntheticFormEvent />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
