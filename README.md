# Next Authentication

`next-authorization` is an authentication &amp; authorization library for the Next framework that provides user session management.

It handles logging in, logging out and remembering your users' session.

## Features:

- Backend agnostic. You are in charge of how the user is validated in the backend
- Exposes `login` and `logout` helper functions
- Let you restrict pages to logged-in users using a HOC

## Installation

`next-authentication` is published to npm:

```
npm i next-authentication
```

## Usage

```
import withAuth, { login, logout } from 'next-authentication'

const about = (props) =>
    <h1>Hello, World</h2>
```

## Example

```

```

## Project Status
