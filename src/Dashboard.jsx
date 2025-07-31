import React, { useState } from "react";
import useAuth from "./useAuth.jsx";
import SearchBar from "./SearchBar.jsx";
import TrackSearchResult from "./TrackSearchResult.jsx";
import Player from "./Player.jsx";
import useSpotifyApi from "./useSpotifyApi.js";
import Lyrics from "./Lyrics.jsx";

export default function Dashboard({ code }) {
  const { accessToken, error } = useAuth(code);
  const [search, setSearch] = useState("");

  const [playingTrack, setPlayingTrack] = useState();
  const [showLyrics, setShowLyrics] = useState(false);
  const tracks = useSpotifyApi(accessToken, search);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setShowLyrics(true);
    setSearch("");
  }

  function handleBack() {
    setShowLyrics(false);
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }
  if (!accessToken) {
    return <div>Loading...</div>;
  }

  if (showLyrics && playingTrack) {
    return <Lyrics track={playingTrack} onBack={handleBack} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#181818',
      padding: 0,
      margin: 0,
    }}>
      <div className="container d-flex flex-column align-items-center justify-content-center" style={{ maxWidth: 800, width: '100%' }}>
        <SearchBar search={search} setSearch={setSearch} />
        <div className="w-100 d-flex flex-column align-items-center" style={{ maxWidth: 700, overflowY: 'auto' }}>
          {tracks.map(track => (
            <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
          ))}
        </div>
      </div>
      <div className="fixed-bottom w-100" style={{ maxWidth: 700, margin: '0 auto' }}>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );
}
