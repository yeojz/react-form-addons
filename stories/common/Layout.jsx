import React, {PropTypes} from 'react';
import Sidebar from 'stories/common/Sidebar';

const propTypes = {
  active: PropTypes.object
}

class Layout extends React.Component {

  state = {
    menu: false
  }

  toggleMenu = () => {
    this.setState({menu: !this.state.menu})
  }

  render() {
    const show = this.state.menu ? 'is-active' : '';

    return (
      <div className={`stories-common-root ${show}`}>
        <div className='story-list'>
          <Sidebar active={this.props.active}/>
        </div>

        <div className={`hamburger hamburger--htx ${show}`} onClick={this.toggleMenu}>
          <span>menu</span>
        </div>

        <div className='story-viewer'>
          <div className='content'>{this.props.children}</div>
        </div>
      </div>
    )
  }
}

Layout.propTypes = propTypes;
export default Layout;
