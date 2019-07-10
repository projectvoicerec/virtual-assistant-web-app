import React, { Component } from 'react'
import Artyoum from 'artyom.js'
import { loginUser } from '../../utils/ApiReq'
import { AppConsumer } from '../../ContextProvider'

export default class Login extends Component {
  /**
   * Define our Login State
   */
  state = {
    email: '',
    password: '',
    errors: null
  };

  Jarvis = new Artyoum()

  componentDidMount () {
    const { Jarvis } = this
    setTimeout(() => {
      Jarvis.say('Hello I am Jarvis I am your virtual Assistant you are on the Login page!')
    }, 1500)
  }

  componentWillReceiveProps (nextProps) {
    console.log('Next Props ==', nextProps)
    if (nextProps.isAuthenticated) {
      this.props.history.push('/home') // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  };

  onSubmit = (e, context) => {
    e.preventDefault()
    const { history } = this.props
    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    const geterrors = async () => {
      await loginUser(userData, history, context)
    }
    geterrors()
    // this.props.loginUser(userData);
  };

  render () {
    const { email, password, errors } = this.state
    return (
      <div className=' container login-page'>
        <div className='row  py-2 mb-3 px-2'>
          <h4>Login Page</h4>
        </div>
        <div className='row'>
          <AppConsumer>
            {context => (
              <form
                action=''
                onSubmit={e => {
                  this.onSubmit(e, context)
                }}
              >
                <div className='form-group'>

                  {context.state.errors ? (
                    <div className='alert alert-danger login-errors' role='alert'>
                      {context.state.errors.error}
                    </div>
                  ) : null}
                  <label htmlFor='exampleInputEmail1'>Email address</label>
                  <input
                    onChange={this.onChange}
                    // error={errors.email}
                    value={email}
                    type='email'
                    className='form-control'
                    id='email'
                    aria-describedby='emailHelp'
                    placeholder='Enter email'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleInputPassword1'>Password</label>
                  <input
                    onChange={this.onChange}
                    value={password}
                    // error={errors.password}
                    type='password'
                    className='form-control'
                    id='password'
                    placeholder='Password'
                  />
                </div>
                <button type='submit' className='btn btn-dark'>
                Submit
                </button>
              </form>
            )}
          </AppConsumer>
        </div>

      </div>
    )
  }
}
