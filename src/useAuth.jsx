import React from "react";

export default function useAuth(code) {
   const [accessToken, setAccessToken] = useState();
   const [refreshToken, setRefreshToken] = useState();
   const [expiresIn, setExpiresIn] = useState();
}