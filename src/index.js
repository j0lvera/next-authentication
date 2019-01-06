import { Component } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

export const login = ({ token, cookieOptions, redirect }) => {
  cookie.set('token', token, cookieOptions)
  Router.push(redirect)
}

export const logout = redirect => {
  cookie.remove('token')
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
  Router.push(redirect)
}

export default function withAuth({ redirect }) {
  return function withAuthFactory(WrappedComponent) {
    return class Auth extends Component {
      static async getInitialProps(context) {
        const token = auth({ context, redirect })

        const componentProps =
          WrappedComponent.getInitialProps &&
          (await WrappedComponent.getInitialProps(context))

        return { ...componentProps, token }
      }

      constructor(props) {
        super(props)
        this.syncLogout = this.syncLogout.bind(this)
      }

      componentDidMount() {
        window.addEventListener('storage', this.syncLogout)
      }

      componentWillUnmount() {
        window.removeEventListener('storage', this.syncLogout)
        window.localStorage.removeItem('logout')
      }

      syncLogout(event) {
        if (event.key === 'logout') {
          Router.push(redirect)
        }
      }

      render() {
        return <WrappedComponent {...this.props} />
      }
    }
  }
}

export const auth = ({ context, redirect }) => {
  const { token } = nextCookie(context)

  if (context.req && !token) {
    context.res.writeHead(302, { Location: redirect })
    context.res.end()
    return
  }

  if (!token) {
    Router.push(redirect)
  }

  return token
}

export const getCookie = nextCookie
