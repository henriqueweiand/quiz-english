"use client";

interface YoutubeEmbedProps {
  url: string;
}

export const YoutubeEmbed = ({ url }: YoutubeEmbedProps) => {
  return (
    <iframe
      width="560"
      height="315"
      src={url}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ></iframe>
  );
};
