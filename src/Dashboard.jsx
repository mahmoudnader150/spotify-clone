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
    <div className="container py-2">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {tracks.map(track => (
          <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
        ))}
      </div>
      <div className="fixed-bottom">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );
}
