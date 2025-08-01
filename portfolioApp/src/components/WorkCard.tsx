import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import cardStyles from "./card.styles";
import { formatDate } from "../helpers";

interface Job {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  company: string;
  details: string;
  location: string;
}

interface WorkCardProps {
  job: Job;
}

const WorkCard = ({ job }: WorkCardProps) => {
  return (
    <Card sx={cardStyles.cardBorder}>
      <CardActionArea sx={cardStyles.card}>
        <CardContent>
          <Typography variant="h6" component="div">
            {job.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {job.company} - {job.location}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {formatDate(job.startDate)} - {formatDate(job.endDate)}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {job.details}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default WorkCard;
