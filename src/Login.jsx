import React from "react";
import { Container } from "react-bootstrap";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=92e32100b0a64585add9699486cfbf32&response_type=code&redirect_uri=https://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login(){
    return(
        <Container>
          <h1>Login to Spotify</h1>
          <a href={AUTH_URL} className="btn btn-success btn-lg ">Login with Spotify</a>
        </Container>
      )
}