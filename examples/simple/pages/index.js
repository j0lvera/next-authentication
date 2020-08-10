import React from "react";
import Layout from "../components/layout";

const Home = () => (
  <Layout>
    <h1>
      Next.js Authentication example with{" "}
      <code>
        <a href="https://github.com/j0lv3r4/next-authentication">
          next-authentication
        </a>
      </code>
    </h1>

    <h2>Pre-requisites</h2>

    <p>
      Inside the <code>/examples/simple</code> folder run:
    </p>
    <ol>
      <li>
        <code>node lib/db-init.js</code> to create the SQLite database necessary
        to run the example
      </li>
      <li>
        <code>npm install</code> or <code>yarn</code> to install the
        dependencies
      </li>
      <li>
        <code>npx next dev</code> to start the example
      </li>
    </ol>

    <p>
      And finally, visit{" "}
      <a href="https://localhost:3000">https://localhost:3000</a> to view the
      example in your browser.
    </p>
    <style jsx>{`
      li {
        margin-bottom: 0.5rem;
      }
    `}</style>
  </Layout>
);

export default Home;
