import React from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

export const login = ({ token, cookieOptions, callback }) => {
  cookie.set('token', token, cookieOptions)
  callback()
}

export const logout = callback => {
  cookie.remove('token')
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
  callback()
}

export default function withAuth({ callback, serverRedirect }) {
  return function withAuthFactory(WrappedComponent) {
    return class Auth extends React.Component {
      static async getInitialProps(context) {
        const token = auth({ context, callback, serverRedirect })

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

export const auth = ({ context, callback, serverRedirect }) => {
  const { token } = nextCookie(context)

  if (context.req && !token && serverRedirect) {
    context.res.writeHead(302, { Location: serverRedirect })
    context.res.end()
    return
  }

  if (!token) {
    callback()
  }

  return token
}

export const getCookie = nextCookie
