import React, {PropTypes} from 'react';
import noop from 'lodash.noop';
import withSideEffect from 'src/withSideEffect';
import Inputs from './Inputs';
import Pretty from './Pretty';

export default (sideEffect) => {
    const StatefulInputs = withSideEffect(sideEffect)(Inputs);
    class SideEffect extends React.Component {
        static propTypes = {
            print: PropTypes.bool
        }

        state = {
            data: {}
        }

        updateState = (data) => {
            this.setState({data});
        }

        render() {
            return (
                <div className='stories-sideeffect'>
                    <StatefulInputs
                        formData={this.state.data}
                        onChange={noop}
                        onSubmit={noop}
                        setFormData={this.updateState} />

                    <Pretty data={this.state.data} print={this.props.print}/>
                </div>
            )
        }
    }
    return SideEffect;
}
