import React from "react";

export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="search"
      className="form-control form-control-lg my-3"
      placeholder="Search Songs/Artists"
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  );
}
