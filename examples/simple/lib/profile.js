import Router from "next/router";
import { useState, useEffect } from "react";

async function fetchProfile(url) {
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  }
}

function useFetchProfile(url, required = false) {
  const [loading, setLoading] = useState(() => true);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (!loading) {
      return;
    }
    setLoading(true);
    let isMounted = true;
    fetchProfile(url)
      .then(({ user }) => {
        if (isMounted) {
          setLoading(false);
          setProfile(user);
        }
      })
      .catch((error) => {
        console.log("error", error);
        required && Router.push("/login");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    profile,
    loading,
  };
}

export default useFetchProfile;
