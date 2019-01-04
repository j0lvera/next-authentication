import React, { Component } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

export function withAuthSync(WrappedComponent) {
  return class Auth extends Component {
    static async getInitialProps(ctx) {
      const token = auth(ctx)

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))

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
        console.log('logged out from storage!')
        Router.push('/login')
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

export const auth = (ctx, failRedirect = '/login') => {
  const { token } = nextCookie(ctx)

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: failRedirect })
    ctx.res.end()
    return
  }

  if (!token) {
    Router.push(failRedirect)
  }

  return token
}

export const logout = () => {
  cookie.remove('token')
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
  Router.push('/login')
}

export const getCookie = nextCookie
