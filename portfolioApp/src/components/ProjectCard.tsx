import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import YouTubeEmbed from "./YoutubeEmbed";
import cardStyles from "./card.styles";
import { formatDate } from "../helpers";
import { useAuth } from "../context/authContext";

interface Project {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  videoUrl: string;
  sourceUrl: string;
  type: string;
  details: string[];
  stack: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { isAuth } = useAuth();

  return (
    <Card>
      <CardActionArea sx={cardStyles.card}>
        <CardContent sx={{ height: "100%" }}>
          <Typography variant="h5" component="div">
            {project.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {project.type} Project
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {formatDate(project.startDate)} - {formatDate(project.endDate)}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {`- ${project.details.join("\n")}`}
          </Typography>
          <YouTubeEmbed embedUrl={project.videoUrl} />
          <Typography variant="body1" color="textSecondary">
            Stack: {project.stack.join(", ")}
          </Typography>
          <Typography variant="body1" color="primary">
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Source Code
            </a>
          </Typography>

          {isAuth && (
            <Button variant="outlined" sx={{ m: 1 }}>
              Edit Project
            </Button>
          )}
          {isAuth && (
            <Button variant="outlined" color="error" sx={{ m: 1 }}>
              Delete Project
            </Button>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;
