# Next Authentication
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fj0lv3r4%2Fnext-authentication.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fj0lv3r4%2Fnext-authentication?ref=badge_shield)


`next-authentication` is an authentication &amp; authorization library for the Next framework. It provides user session management and handles logging in, logging out.

## Features:

- Backend agnostic. You are in charge of implementing the login and registration in the backend with the language you prefer.
- You can optionally use the `login` and `logout` helper functions or implement your own.
- Restricts pages to logged-in users using the `withAuth` HOC or the `auth` helper function.

## Installation

`next-authentication` is published to npm:

```
$ npm i next-authentication --save
```

## Usage

### Login a user

```js
import { Component } from 'react'
import Router from 'next/router'
import { login } from 'next-authentication'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const { username, password } = this.state

    try {
      const response = await fetch('https://apiurl.io', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (response.ok) {
        const { token } = await response.json()
        const loginOptions = {
          token,
          cookieOptions: { expires: 1 },
          callback: () => Router.push('/profile')
        }
        login(loginOptions)
      } else {
        console.log('Login failed.')
      }
    } catch (error) {
      console.log('Implementation or Network error.')
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}

export default Login
```

### Logout

```js
import Link from 'next/link'
import Router from 'next/router'
import { logout } from 'next-authorization'

const Header = props => {
  const redirect = () => Router.push('/login')
  const userLogout = () => logout(redirect)
  return (
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <button onClick={userLogout}>Logout</button>
      </nav>
    </header>
  )
}

export default Header
```

### Restrict pages to logged-in users

```js
import Router from 'next/router'
import withAuth from 'next-authentication'

const Profile = props => <div>User is logged in</div>

const authOptions = {
  // client callback for invalid sessions
  callback: () => Router.push('/login'),
  // the server takes care of the redirect, only pass a string
  // with the route
  serverRedirect: '/login'
}
export default withAuth(authOptions)(Profile)
```

## next-authorization API

### login(config)

`next-authentication` uses [`js-cookie`](https://www.npmjs.com/package/js-cookie) for cookie handling so you can pass the same configuration object to the `cookieOptions` option.

```js
// Login a user
login({
  token: '',
  cookieOptions: { expires: 7, path: '' },
  callback: () => {
    console.log('Do something after the user is logged in.')
  }
})
```

### logout(callback)

```js
logout(() => {
  console.log('Do something after the user is logged out.')
})
```

### withAuth(config)

```js
withAuth({
  serverRedirect: '/login'
  callback: () => {
    console.log('Do something if the session is invalid.')
  },
})(Component)
```

### auth(config)

```js
auth({
  serverRedirect: '/login'
  callback: () => {
    console.log('Do something if the session is invalid.'),
  },
  content: ctx // context instance from `getInitnialProps`,
})
```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fj0lv3r4%2Fnext-authentication.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fj0lv3r4%2Fnext-authentication?ref=badge_large)
