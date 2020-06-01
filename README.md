# Next Authentication

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fj0lv3r4%2Fnext-authentication.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fj0lv3r4%2Fnext-authentication?ref=badge_shield)

> Authentication &amp; Authorization for Next.js

next-authentication provides a set of functions and middlewares to implement Authentication, Authorization and session management in Next.js applications.

## Usage

```js
// Setup
// file: lib/auth.js

import bcrypt from 'bcrypt';
import { nextAuth, AuthError } from 'next-authentication';
import { User } from '../user/model';

const nextAuthOptions = {   
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

// Authenticate
// file: pages/api/authenticate.js

import { authenticate } from '../lib/auth.js'

const handler = (req, res) => {
  res.status(200).json({ message: 'User logged in', user: req.user });
}

export default authenticate(handler);

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

### `nextAuth(options={})`

The main function of the library that consumes an option object and returns an object with the functions you to use for authenticate, authorize, and log out users.

#### `Options`

An object containing required and optional configuration elements. Valid `options` keys include:

##### `verify(username, password)` (required)

A function that takes a username and a password and must return an object containing at least the key `username`. The function should run the logic to verify the veracity of the user identity.

### `authenticate(handler, verify, secret, cookieOptions)`

A function middleware that helps to verify the authenticity of the user identity.

#### `handler(req, res)`

A request handler.

#### `verify(username, password)`

A function that verifies the authenticity of the user identity.

#### `secret` \<string\>

A secret string that's at least 16 chars long.

#### `cookieOptions` \<Object\>

To handle cookies the library uses the [`cookie` module](https://www.npmjs.com/package/cookie). We pass the object directly to the parse method in `cookie.parse` so it accepts [the same options](https://www.npmjs.com/package/cookie#options).

## Installation

With [npm](https://npmjs.com):

```
$ npm i next-authentication --save
```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fj0lv3r4%2Fnext-authentication.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fj0lv3r4%2Fnext-authentication?ref=badge_large)
