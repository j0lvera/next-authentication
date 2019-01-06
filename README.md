# Next Authentication

`next-authorization` is an authentication &amp; authorization library for the Next framework. It provides user session management and handles logging in, logging out.

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

### Login users

`next-authorization` doesn't know anything about the backend. The only requirement is a string that we use as token, when this is provided we use the `login` function to save the session and keep the user logged-in.

```js
import { Component } from 'react'
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
        // `next-authorization` doesn't know anything about the backend, the only thing it needs is a string we use as a token
        const { token } = await response.json()
        const loginOptions = {
          token,
          cookieOptions: { expires: 1 },
          redirect: '/profile'
        }

        // Saves session and redirects the user to the route you chose
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

The `login` function deletes the session and redirects the user to the route given.

```js
import Link from 'next/link'
import { logout } from 'next-authorization'

const Header = props => (
  <header>
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/login">
        <a>Login</a>
      </Link>
      <button onClick={() => logout('/login')}>Logout</button>
    </nav>
  </header>
)

export default Header
```

### Restrict pages to logged-in users

`next-authorization` provides a default High Order Component called `withAuth` let the user view the page if the session is valid and redirects the user otherwise.

```js
import withAuth from 'next-authentication'

const Profile = props => <div>User is logged in</div>

const authOptions = { redirect: '/login' }
export default withAuth(authOptions)(Profile)
```

## Example

_Coming soon_
