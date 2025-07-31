import { useEffect, useState } from "react";
import axios from "axios";

export default function useSpotifyApi(accessToken, search) {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!search) return setTracks([]);
    if (!accessToken) return;

    let cancel = false;
    axios
      .get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: search,
          type: "track",
        },
      })
      .then(res => {
        if (cancel) return;
        setTracks(
          res.data.tracks.items.map(track => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              track.album.images[0]
            );
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
            };
          })
        );
      });
    return () => (cancel = true);
  }, [search, accessToken]);

  return tracks;
}
