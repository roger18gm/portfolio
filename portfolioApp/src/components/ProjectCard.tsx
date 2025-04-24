import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import YouTubeEmbed from "./YoutubeEmbed";

interface Project {
    name: string;
    type: string;
    details: string;
    start: string;
    end: string;
    video_url: string;
    repo_link: string;
}

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({project}: ProjectCardProps) => {
  return (
    <Card>
          <CardActionArea
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h5" component="div">
                {project.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {project.type} Project
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {project.start} - {project.end}
              </Typography>
              <Typography variant="body2">
                {project.details}
              </Typography>
              <YouTubeEmbed embedUrl={project.video_url}/>
            </CardContent>
          </CardActionArea>
        </Card>
  );
}

export default ProjectCard;
