import React from "react";
import useAuth from "./useAuth.jsx";

export default function Dashboard({ code }) {
  const { accessToken, refreshToken, expiresIn, error } = useAuth(code);

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!accessToken) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Logged in!</h2>
      <div>Access Token: {accessToken}</div>
      <div>Refresh Token: {refreshToken}</div>
      <div>Expires In: {expiresIn}</div>
    </div>
  );
}
