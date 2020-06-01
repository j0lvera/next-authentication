import fetch from "isomorphic-unfetch";
import Layout from "../components/layout";
import Form from "../components/form";

function Signup() {
  function signupRequest({ username, password }) {
    return fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  }

  return (
    <Layout>
      <div className="signup">
        <h2>Signup</h2>
        <Form
          request={signupRequest}
          redirectUrl={"/login"}
          successMsg={"User created. Redirecting to login page."}
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

export default Signup;
