import { Box, Typography } from "@mui/material";

interface Experience {
    title: string;
    company: string;
    location: string;
    details: string;
    start: string;
    end: string;
}

interface WorkCardProps {
    experience: Experience;
}

const WorkCard = ({experience}:WorkCardProps) => {
  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '16px',
        marginBottom: '16px',
      }}
    >
      <Typography variant="h6" component="div">
        {experience.title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {experience.company} - {experience.location}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {experience.start} - {experience.end}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        {experience.details}
      </Typography>
    </Box>
  );
}

export default WorkCard;