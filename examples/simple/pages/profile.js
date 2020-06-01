import React from "react";
import Layout from "../components/layout";
import useFetchProfile from "../lib/profile";

const Profile = () => {
  const { profile, loading } = useFetchProfile("/api/profile", true);
  console.log("profile", profile);
  return (
    <Layout>
      {loading ? <p>loading...</p> : <p>Logged in as {profile.username}</p>}

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
