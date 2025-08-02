import { Box } from "@mui/material";

interface YouTubeEmbedProps {
  embedUrl: string;
}

const YouTubeEmbed = ({ embedUrl }: YouTubeEmbedProps) => {
  if (embedUrl === "") {
    return;
  }
  return (
    <Box
      sx={{
        position: "relative",
        paddingTop: "56.25%", // 16:9 aspect ratio
        height: 0,
        overflow: "hidden",
        my: "1rem",
      }}
    >
      <iframe
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      ></iframe>
    </Box>
  );
};

export default YouTubeEmbed;
