import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Artyoum from 'artyom.js'
import { AppConsumer, AppContext } from '../../ContextProvider'
import { PostBody } from '../layout'
import { logoutUser } from '../../utils/ApiReq'

class Profile extends Component {
  /**
   * Define state & Member vars
   */

  static contextType = AppContext;

  state = {
    avatar: null
  };

  Jarvis = new Artyoum()

  componentDidMount () {
    const { Jarvis } = this
    const { context, jarvisAddCommands } = this
    const { history } = this.props
    console.log('history', history)
    const userId = context.state.userData.id
    this.getUserPosts(userId, context)
    const userAvatar = this.getUserData(userId)
    context.setUserAvatar({ userAvatar })
    Jarvis.fatality()
    setTimeout(() => {
      Jarvis.initialize({
        lang: 'en-US',
        continuous: true,
        debug: true,
        speed: 0.8,
        listen: true
      })
      Jarvis.say('Hello I am Jarvis I am your virtual Assistant you are on the profile page!')
      jarvisAddCommands(Jarvis, history, context)
    }, 1500)
  }

  /**
   * get user Data
   */
  getUserData = async (userId, context) => {
    try {
      const userData = await axios.get(`/api/users/user/${userId}`)
      const { data, status } = await userData
      console.log('data-avatar', data.avatar)
      const userAvatar = `/api/${data.avatar}`
      console.log('my avatar ==>', userAvatar)

      this.setState({ avatar: userAvatar })

      console.log('userData', { data, status })
      return userAvatar
    } catch (error) {
      console.log('profile page user Data', error.response)
    }
  }

  getUserPosts = async (userId, context) => {
    try {
      const userPosts = await axios.get(`/api/posts/user/${userId}`)
      const { data, status } = await userPosts
      console.log('userPosts', { data, status })
      context.setProfilePosts(data)
    } catch (error) {
      console.log('profile page', error.response)
    }
  };

  jarvisAddCommands = (Jarvis, history, context) => {
    Jarvis.addCommands({ indexes: ['go Home', 'log out'],
      action: function (i) {
        if (i === 0) {
          history.push('/home')
        }
        if (i === 1) {
          logoutUser(context)
        }
      },
      speed: 0.7 })
  }

  render () {
    const { Jarvis } = this
    Jarvis.fatality()

    const { context, state } = this
    const { history } = this.props
    const userName = context.state.userData.name
    const userAvatar = this.state.avatar

    console.log('my avatar', userAvatar)
    return (
      <Fragment>
        <AppConsumer>
          {context =>
            context.state.userPosts ? (
              <div className='container  profile-page'>
                <div className='text-center mt-5 p-3'>
                  <img src={`http://localhost:5000${userAvatar}`} className='profile-img' alt='...' />
                  <div className='container text-center mt-2 p-2'>
                    <h5 className='profile-text'>{userName}</h5>
                  </div>
                </div>
                {context.state.userPosts.map((post, i) => (
                  <PostBody key={i} post={post.post} i={i} history={history} />
                ))}
              </div>
            ) : (
              <h2 className='profile-page'>Loading ...</h2>
            )
          }
        </AppConsumer>
      </Fragment>
    )
  }
}

export default withRouter(Profile)
