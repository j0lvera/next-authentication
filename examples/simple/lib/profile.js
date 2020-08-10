import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

async function fetcher(url) {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return { user: data?.user || null };
  }
}

function useProfile(url, redirectTo) {
  const router = useRouter();
  const { data, error } = useSWR(url, fetcher);
  const user = data?.user;
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    if (!redirectTo) {
      return;
    }

    if (redirectTo && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [redirectTo, isAuthenticated]);

  return {
    user,
    error,
    isAuthenticated,
    isLoading: !error && !data,
  };
}

export { useProfile };
