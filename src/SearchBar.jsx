import React from "react";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="d-flex justify-content-center my-4">
      <input
        type="search"
        className="form-control"
        style={{
          maxWidth: 500,
          borderRadius: 50,
          padding: '1.1em 2em',
          fontSize: '1.2em',
          background: '#222',
          color: '#fff',
          border: '2px solid #1db954',
          boxShadow: '0 2px 16px rgba(30,185,84,0.08)',
          outline: 'none',
        }}
        placeholder="Search for songs, artists, albums..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  );
}
