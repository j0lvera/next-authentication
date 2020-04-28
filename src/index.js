// @ts-check

import React from "react";
import nookies from "nookies";

/**
 * Saves the session token in a cookie
 * @param {object} ctx
 * @param {string} token
 * @param {object} cookieOptions
 * @param {function} callback
 * @returns {function} callback
 */
function login(ctx, { token, cookieOptions, callback }) {
  nookies.set(ctx, "token", token, cookieOptions);
  return callback();
}

/**
 * Destroys the session and triggers logout event
 * @param {object} ctx
 * @param {function} callback
 */
function logout(ctx, callback) {
  nookies.destroy(ctx, "token");
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now());
  callback();
}

function withAuth({ onError }) {
  return function withAuthFactory(WrappedComponent) {
    return class Auth extends React.Component {
      static async getInitialProps(ctx) {
        const token = auth(ctx, { onError });

        const componentProps =
          WrappedComponent.getInitialProps &&
          (await WrappedComponent.getInitialProps(ctx));

        return { ...componentProps, token };
      }

      constructor(props) {
        super(props);
        this.syncLogout = this.syncLogout.bind(this);
      }

      componentDidMount() {
        window.addEventListener("storage", this.syncLogout);
      }

      componentWillUnmount() {
        window.removeEventListener("storage", this.syncLogout);
        window.localStorage.removeItem("logout");
      }

      syncLogout(event) {
        if (event.key === "logout") {
          callback();
        }
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    };
  };
}

function getCookie(ctx) {
  return nookies.get(ctx);
}

function auth(ctx, { onError }) {
  const { token } = nookies.get(ctx);

  if (!token) {
    onError(ctx);
  }

  return token;
}

export { login, auth, withAuth, getCookie, logout };
