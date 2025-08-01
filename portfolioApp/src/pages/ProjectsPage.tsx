import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import ProjectCard from "../components/ProjectCard";
import { useEffect, useState } from "react";
import axios from "axios";

type Project = {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  videoUrl: string;
  sourceUrl: string;
  type: string;
  details: string[];
  stack: string[];
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await axios.get<Project[]>(
          `${import.meta.env.VITE_API_URL}/projects`
        );
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    getProjects();
  }, []);

  return (
    <Box sx={{ margin: { md: "2rem 8rem", lg: "2rem 18rem" } }}>
      <Typography variant="h4">Project Contributions</Typography>
      <Divider sx={{ margin: "1rem 0" }} />

      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        Here are some of the projects I've contributed to over the years.
      </Typography>
      {isLoading && <CircularProgress size="3rem" />}
      {!isLoading && projects.length === 0 && (
        <Typography variant="body1">No projects found.</Typography>
      )}
      <Box
        sx={{
          width: "100%",
          gap: 2,
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </Box>
    </Box>
  );
};

export default ProjectsPage;
