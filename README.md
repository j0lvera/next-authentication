# Next Authentication

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fj0lv3r4%2Fnext-authentication.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fj0lv3r4%2Fnext-authentication?ref=badge_shield)

> Authentication &amp; Authorization for Next.js.

Next Authentication provides a set of functions to implement Authentication and Authorization in Next.js applications.

## Usage

```js
// Setup
// lib/auth.js

import bcrypt from 'bcrypt';
import { nextAuth } from 'next-authentication';

const nextAuthOptions = {
  verify: async (username, password) => {
    // Pseudo code that verifies a user in a fictitious database
    const user = await User.query().findOne({ username });
    const validPassword = bcrypt.compareSync(password, user.hash);

    if (validPassword) {
        return { username: user.username };    
    }
  },
  secret: process.env.SECRET || 'alongsecretvaluethatsatleast16chars'
}

export const { authenticate, authorize } = nextAuth(nextAuthOptions);

// Authenticate
// pages/api/authenticate.js

import { authenticate } from '../lib/auth.js'

const handler = (req, res) => {
  res.status(300).json({ message: 'ok' });
}

export default authenticate(handler);

// Authorize
// pages/api/restricted-content.js

import { authorize } from '../lib/auth.js';

const handler = (req, res) => {
  console.log('is authorized', res.isAuthorized);
  res.status(200).json({ user: res.user })
}

export default authorize(handler);
```

## API

### login(ctx, config)

`next-authentication` uses [`nookies`](https://www.npmjs.com/package/nookies) for cookie handling so you can pass the same configuration object to the `cookieOptions` option.

```js
// Login a user
login(ctx, {
  token: '',
  cookieOptions: {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  },
  callback: () => {
    console.log('Do something after the user is logged in.')
  }
});
```

### logout(ctx, callback)

```js
logout(ctx, () => {
  console.log('Do something after the user is logged out.')
});
```

### withAuth(config)

```js
withAuth({
  serverRedirect: '/login',
  onError: (ctx) => {
    console.log('Do something if the session is invalid.')
  },
})(Component);
```

### auth(config)

```js
auth({
  serverRedirect: '/login',
  callback: () => {
    console.log('Do something if the session is invalid.');
  },
  content: ctx // context instance from `getInitnialProps`,
});
```


## Installation

With [npm](https://npmjs.com):

```
$ npm i next-authentication --save
```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fj0lv3r4%2Fnext-authentication.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fj0lv3r4%2Fnext-authentication?ref=badge_large)
