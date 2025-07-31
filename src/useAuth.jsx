import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) return;
    axios
      .post("http://localhost:3000/login", { code })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        setError(null);
        // Remove code from URL to prevent reuse
        window.history.replaceState({}, document.title, "/");
      })
      .catch((err) => {
        setError("Authentication failed. Please try logging in again.");
        setAccessToken(null);
        setRefreshToken(null);
        setExpiresIn(null);
        // Optionally redirect to login page
        // window.location = "/";
      });
  }, [code]);

  return { accessToken, refreshToken, expiresIn, error };
}