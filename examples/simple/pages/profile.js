import React from "react";
import Layout from "../components/layout";
import { useProfile } from "../lib/profile";

const Profile = () => {
  const { user, isLoading } = useProfile("/api/profile", "/");
  return (
    <Layout>
      {isLoading ? <p>loading...</p> : <p>Logged in as {user.username}</p>}

      <style jsx>{`
        p {
          font-size: 1.5rem;
          font-weight: 300;
        }
      `}</style>
    </Layout>
  );
};

export default Profile;
