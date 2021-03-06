import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Artyom from 'artyom.js'
import { AppConsumer, AppContext } from '../../ContextProvider'
/**
 * custom modules
 */
import { logoutUser } from '../../utils/ApiReq'

/**
 * starting of our class
 */
export default class Header extends Component {
  /**
   * Manage state & live cycle Method
   */
  static contextType = AppContext;

  state = {
    goSignup: false,
    signupLink: '/signup'
  };

  Jarvis = new Artyom();

  componentDidMount () {

  }

  render () {
    return (
      <nav className='header-banner pt-2'>
        <div className='container'>
          <div className='row nav-row'>
            <Link to='/' className='logo'>
              <h5>Social-Network</h5>
            </Link>
            <AppConsumer>
              {context => (
                <Fragment>
                  {context.state.isAuthenticated ? (
                    <div className='d-flex flex-row align-items-center p-2'>
                      <Link to='/home'>
                        <h6 className='mr-2'>Home</h6>
                      </Link>
                      <Link to='/profile'>
                        <h6>profile</h6>
                      </Link>
                      <Link to='/' onClick={e => logoutUser(context)}>
                        <h6 className='ml-3 logout-btn'>logout</h6>
                      </Link>
                    </div>
                  ) : (
                    <div className='menu-items'>
                      <Link to='/login'>
                        <h6>Login</h6>
                      </Link>
                      <Link to='/signup'>
                        <h6>Signup</h6>
                      </Link>
                    </div>
                  )}
                </Fragment>
              )}
            </AppConsumer>
          </div>
        </div>
      </nav>
    )
  }
}
