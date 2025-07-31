import { Box, IconButton, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box sx={{ textAlign: "center", padding: "1rem" }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Roger Galan Manzano. All rights reserved.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Built with React and Material-UI
      </Typography>
      <IconButton
        href="https://github.com/roger18gm"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon />
      </IconButton>
      <IconButton
        href="https://www.linkedin.com/in/roger-galan-manzano/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedInIcon />
      </IconButton>
    </Box>
  );
};

export default Footer;
