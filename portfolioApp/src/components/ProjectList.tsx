import ProjectCard from "./ProjectCard";
import { Box } from "@mui/material";
import projects from "../projects";

const ProjectList = () => {

  return (
    <Box
      sx={{
        width: '100%',
        gap: 2,
      }}
    >
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </Box>
  );
}

export default ProjectList;
