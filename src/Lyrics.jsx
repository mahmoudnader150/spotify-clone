import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Lyrics({ track, onBack }) {
  const [lyrics, setLyrics] = useState("Loading lyrics...");

  useEffect(() => {
    if (!track) return;
    setLyrics("Loading lyrics...");
    axios
      .get(`/lyrics`, {
        params: { artist: track.artist, title: track.title }
      })
      .then(res => {
        setLyrics(res.data.lyrics || "No lyrics found.");
      })
      .catch(() => {
        setLyrics("No lyrics found or service unavailable.");
      });
  }, [track]);

  return (
    <div className="container py-4 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <button className="btn btn-outline-light mb-4 align-self-start" style={{ background: '#1db954', color: '#fff', border: 'none', fontWeight: 'bold' }} onClick={onBack}>&larr; Back</button>
      <div className="text-center mb-4">
        <h2 style={{ color: '#1db954', fontWeight: 700 }}>{track.title}</h2>
        <h4 style={{ color: '#fff', fontWeight: 400 }}>{track.artist}</h4>
      </div>
      <div style={{
        background: 'rgba(34,34,34,0.95)',
        color: '#fff',
        padding: '2em',
        borderRadius: '16px',
        boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
        maxWidth: '700px',
        width: '100%',
        minHeight: '300px',
        fontSize: '1.15em',
        lineHeight: 1.7,
        letterSpacing: '0.02em',
        overflowX: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
        {lyrics}
      </div>
    </div>
  );
}
