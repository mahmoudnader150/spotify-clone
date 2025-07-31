import React from "react";

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <div
      className="d-flex align-items-center w-100 my-2 p-2 track-result"
      style={{
        cursor: "pointer",
        background: "rgba(34,34,34,0.85)",
        borderRadius: 12,
        boxShadow: "0 2px 12px rgba(30,185,84,0.07)",
        transition: "background 0.2s, box-shadow 0.2s",
        maxWidth: 650,
        minHeight: 80,
      }}
      onClick={handlePlay}
      onMouseOver={e => e.currentTarget.style.background = '#222'}
      onMouseOut={e => e.currentTarget.style.background = 'rgba(34,34,34,0.85)'}
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px", borderRadius: 8, boxShadow: '0 2px 8px #111' }} alt="album" />
      <div className="ml-3" style={{ marginLeft: 18 }}>
        <div style={{ color: '#fff', fontWeight: 600, fontSize: '1.1em' }}>{track.title}</div>
        <div className="text-muted" style={{ fontSize: "0.95em", color: '#b3b3b3' }}>
          {track.artist}
        </div>
      </div>
    </div>
  );
}
