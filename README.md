# Next Authentication

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fj0lv3r4%2Fnext-authentication.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fj0lv3r4%2Fnext-authentication?ref=badge_shield)

> Authentication &amp; Authorization for Next.js

`next-authentication` provides a set of functions and middlewares to implement Authentication, Authorization and session management in Next.js applications.

## Usage

Setup:

```js
// Setup
// file: lib/auth.js

import bcrypt from 'bcrypt';
import { nextAuth, AuthError } from 'next-authentication';
import { User } from '../user/model';

const nextAuthOptions = {   
  cookieName: 'auth-token',
  // Pseudo code that verifies a user in a fictitious database
  verify: async (username, password) => {
      try {
        const user = await User.query().findOne({ username });

        if (!user) {
          throw new AuthError('User does not exist', 404);
        }

        const valid = bcrypt.compareSync(password, user.password);

        if (!valid) {
          throw new AuthError('Invalid credentials', 403);
        }

        return { user: user.username }
      } catch (error) {
        throw new AuthError(`Error trying to verifying the user: ${error.message}`, 500);
      }
  },
  secret: process.env.SECRET || 'alongsecretvaluethatsatleast16chars'
}

export const { authenticate, authorize } = nextAuth(nextAuthOptions);
```

Login:

```js
// Authenticate
// file: pages/api/login.js

import { authenticate } from '../lib/auth.js'

const handler = (req, res) => {
  res.status(200).json({ message: 'User logged in', user: req.user });
}

export default authenticate(handler);
```

Restricted content:

```js
// Authorize
// file: pages/api/restricted-content.js

import { authorize } from '../lib/auth.js';

const handler = (req, res) => {
  console.log('is authorized', res.isAuthorized);
  res.status(200).json({ user: res.user })
}

export default authorize(handler);
```

## API

### `handler(req, res)`

A `requestListener` function that is executed each time an API route gets a request.

This is not a `next-authentication` method, but rather a definition about a parameter we use through the documentation. It’s handy to have the definition for reference.

* `req` [\<IncomingMessage\>](https://nodejs.org/docs/latest-v14.x/api/http.html#http_class_http_incomingmessage)
* `res` [\<ServerResponse\>](https://nodejs.org/docs/latest-v14.x/api/http.html#http_class_http_serverresponse)

Usage:

```js
// file: pages/api/ok.js
const handler = (req, res) => {
  res.end(JSON.stringify({ message: 'ok' }));
}

export default handler;
```

### `nextAuth({ verify, secret, cookieUserOptions, [redirectOnError, redirectUrl] })`

The main function of the library that takes an option object and returns an object with the functions you to use for authentication, authorization, and logout users.

##### `verify(username, password)` (required)

* `username` \<string\> (required)
* `password` \<string\> (required)
* Returns an object with at least a `username` element. e.g., `{ username: 'jolvera' }`

A function that takes a username and a password and must return an object containing at least the key `username`. The function should run the logic to verify the authenticity of a user's identity.

##### `cookieName` \<string\> (optional)

* Default: "next-authentication-token"

##### `secret` \<string\> (required)

A secret string that’s at least 16 characters long.

##### `cookieUserOptions` \<Object\> (optional)

* Default: `{ httpOnly: true, maxAge: 60 * 60 * 24, path: "/" }`

Same options as [`cookie.serialize`](https://github.com/jshttp/cookie#options-1).

##### `redirectOnError` \<boolean\> (optional)

* Default: `true`

If `true`, `next-authentication` redirects the user to [`redirectUrl`](#redirecturl-string-optional) when:

* The user provides invalid credentials
* The user logs out
* There is an unknown error

##### `redirectUrl` \<string\> (optional)

* Default: `/login`

URL to redirect the user to if `redirectOnError` is `true`.

### `authenticate(handler, authenticateOptions)`

A function middleware that verifies the user and creates a cookie session.

You can use the function directly, but the recommended way is through `nextAuth` since the options are setup once there and can be use everywhere. If you use the function directly you will have to call the function with all parameters every time you use it.

#### [`handler(req, res)`](#handlerreq-res)

#### `authenticateOptions` \<Object\>

* [`verify`](#verifyusername-password-required)
* [`secret`](#secret-string-required)
* [`cookieUserOptions`](#cookieuseroptions-object-optional)

### `authorize(handler, authorizeOptions)`

Validates a session.

#### [`handler(req, res)`](#handlerreq-res)

#### `authorizeOptions` \<Object\>

* [`secret`](#secret-string-required)
* [`redirectOnError`](#redirectonerror-boolean-optional)
* [`redirectUrl`](#redirecturl-string-optional)

### `logout(handler, logoutOptions)`

Destroys the user session and redirects the user based on `redirectOnError` and `redirectUrl`.

#### [`handler(req, res)`](#handlerreq-res)

#### `logoutOptions` \<Object\>

* [`redirectOnError`](#redirectonerror-boolean-optional)
* [`redirectUrl`](#redirecturl-string-optional)

### `AuthError(message, status)`

[Custom error class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types) for Authorization errors.

#### `message` \<string\>

Error message to use in a response [\<ServerResponse\>](https://nodejs.org/docs/latest-v14.x/api/http.html#http_class_http_serverresponse) object.

#### `status` \<integer\>

* Default: `401`

Server status code to use in a response [\<ServerResponse\>](https://nodejs.org/docs/latest-v14.x/api/http.html#http_class_http_serverresponse) object.

## Installation

With [npm](https://npmjs.com):

```
$ npm i next-authentication --save
```

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fj0lv3r4%2Fnext-authentication.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fj0lv3r4%2Fnext-authentication?ref=badge_large)
