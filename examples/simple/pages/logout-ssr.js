import React from "react";
import Layout from "../components/layout";
import { logout } from "../lib/auth";

const LogoutSSR = () => {
  return (
    <Layout>
      <p>logging out...</p>
    </Layout>
  );
};

export const getServerSideProps = logout(async ({ req, res }) => {
  return { props: { user: {}, authorized: req.authorized } };
});

export default LogoutSSR;
