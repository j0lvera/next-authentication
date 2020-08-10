import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import Layout from "../components/layout";
import Form from "../components/form";

function Login() {
  function loginRequest({ username, password }) {
    return fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  }

  return (
    <Layout>
      <div className="login">
        <h2>Login</h2>
        <Form
          request={loginRequest}
          label="login"
          redirectUrl={"/profile"}
          successMsg={"Login successful"}
        />
      </div>
      <style jsx>{`
        .h2 {
          text-align: center;
        }
      `}</style>
    </Layout>
  );
}

export default Login;
