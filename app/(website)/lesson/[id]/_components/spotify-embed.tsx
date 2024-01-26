"use client";

interface SpotifyEmbedProps {
  url: string;
}

export const SpotifyEmbed = ({ url }: SpotifyEmbedProps) => {
  return (
    <iframe
      style={{ borderRadius: 12 }}
      src={url}
      width="100%"
      height="152"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};
