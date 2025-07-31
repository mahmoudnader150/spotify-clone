import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Lyrics({ track, onBack }) {
  const [lyrics, setLyrics] = useState("Loading lyrics...");

  useEffect(() => {
    if (!track) return;
    // Try to fetch lyrics from lyrics.ovh
    axios
      .get(`https://api.lyrics.ovh/v1/${encodeURIComponent(track.artist)}/${encodeURIComponent(track.title)}`)
      .then(res => {
        setLyrics(res.data.lyrics || "No lyrics found.");
      })
      .catch(() => {
        setLyrics("No lyrics found.");
      });
  }, [track]);

  return (
    <div className="container py-4">
      <button className="btn btn-secondary mb-3" onClick={onBack}>&larr; Back</button>
      <h3>{track.title} - {track.artist}</h3>
      <pre style={{ whiteSpace: 'pre-wrap', background: '#222', color: '#fff', padding: '1em', borderRadius: '8px' }}>{lyrics}</pre>
    </div>
  );
}
