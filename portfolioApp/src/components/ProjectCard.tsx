import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import YouTubeEmbed from "./YoutubeEmbed";
import cardStyles from "./card.styles";
import { formatDate } from "../helpers";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import ProjectForm from "./ProjectForm";
import axios from "axios";
import { Project } from "../pages/ProjectsPage";

// interface Project {
//   _id: string;
//   name: string;
//   startDate: string;
//   endDate: string;
//   videoUrl: string;
//   sourceUrl: string;
//   type: string;
//   details: string[];
//   stack: string[];
// }

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
  onUpdate: (project: Project) => void;
}

const ProjectCard = ({ project, onDelete, onUpdate }: ProjectCardProps) => {
  const { isAuth } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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
            {project.details.map((detail, index) => (
              <span key={index}>
                {`- ${detail}`}
                {index < project.details.length - 1 && <br />}
              </span>
            ))}
          </Typography>
          <YouTubeEmbed embedUrl={project.videoUrl} />
          <Typography variant="body1" color="textSecondary">
            Tech Stack:{" "}
            {project.stack.map((tech, index) => (
              <Chip sx={{ m: 1 }} key={index} label={tech} color="primary" />
            ))}
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
            <>
              <Button
                variant="outlined"
                sx={{ m: 1 }}
                onClick={() => setEditOpen(true)}
              >
                Edit Project
              </Button>
              <ProjectForm
                open={editOpen}
                onClose={() => setEditOpen(false)}
                onUpdate={onUpdate}
                project={project}
              />
            </>
          )}
          {isAuth && (
            <Button
              variant="outlined"
              color="error"
              sx={{ m: 1 }}
              onClick={() => setDeleteOpen(true)}
            >
              Delete Project
            </Button>
          )}

          <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogContent>
              <Typography variant="body1">
                Are you sure you want to delete this project?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteOpen(false)} color="primary">
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  try {
                    await axios.delete(
                      `${import.meta.env.VITE_API_URL}/projects/${project._id}`,
                      { withCredentials: true }
                    );
                    setDeleteOpen(false);
                    onDelete(project._id); // <-- update parent state
                  } catch (error) {
                    console.error("Error deleting project:", error);
                  }
                }}
                color="secondary"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;
