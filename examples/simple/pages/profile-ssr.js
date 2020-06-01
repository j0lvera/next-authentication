import React from "react";
import Layout from "../components/layout";
import { authorize } from "../lib/auth";

const ProfileSSR = ({ user, authorized }) => {
  return (
    <Layout>
      <p className="lead">
        {authorized ? (
          <>Logged in as {user.username}</>
        ) : (
          <>You need to login</>
        )}
      </p>

      <p>
        Use the <code>authorize</code> middleware with{" "}
        <code>getServerSideProps</code> to prevent unauthorized users to access
        static pages.
      </p>
      <style jsx>{`
        .lead {
          font-size: 1.5rem;
          font-weight: 300;
        }
      `}</style>
    </Layout>
  );
};

export const getServerSideProps = authorize(async ({ req, res }) => {
  const { user, authorized } = req;

  return { props: { user, authorized } };
});

export default ProfileSSR;
