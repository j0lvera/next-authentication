import React, { useState } from "react";
import Router from "next/router";

function Form({ request, redirectUrl, successMsg }) {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    error: "",
    successMsg: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await request(userData);

      if (response.status === 200) {
        console.log("response", await response.json());

        setUserData({
          ...userData,
          successMsg,
        });

        // Delaying the redirect two seconds so the user can read the success
        // message
        setTimeout(() => {
          redirectUrl && Router.push(redirectUrl);
        }, 2000);
      } else {
        console.log("Login failed.");
        // https://github.com/developit/unfetch#caveats
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (error) {
      console.error(
        "You have an error in your code or there are Network issues.",
        error
      );

      const { response } = error;

      console.error(response);

      setUserData({
        ...userData,
        error: response ? response.statusText : error.message,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>

        <input
          type="text"
          id="username"
          name="username"
          value={userData.username}
          onChange={(event) =>
            setUserData({ ...userData, username: event.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>

        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={(event) =>
            setUserData({ ...userData, password: event.target.value })
          }
        />
      </div>

      <button type="submit">Login</button>

      {userData.error && <p className="error">Error: {userData.error}</p>}
      {userData.successMsg && <p className="success">{userData.successMsg}</p>}
      <style jsx>{`
        form {
          display: flex;
          flex-flow: column;
          max-width: 340px;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        label {
          font-weight: 600;
        }

        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .form-group {
          margin-bottom: 0.5rem;
          display: flex;
          flex-direction: column;
        }

        .error {
          margin: 0.5rem 0 0;
          color: brown;
        }

        .success {
          margin: 0.5rem 0 0;
          color: green;
        }
      `}</style>
    </form>
  );
}

export default Form;
