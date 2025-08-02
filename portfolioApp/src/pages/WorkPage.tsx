import { Box, Divider, Typography } from "@mui/material";
import axios from "axios";
import WorkCard from "../components/WorkCard";
import { useEffect, useState } from "react";
import SkeletonCard from "../components/SkeletonCard";

export interface Job {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  company: string;
  details: string[];
  location: string;
}

const WorkPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await axios.get<Job[]>(
          `${import.meta.env.VITE_API_URL}/jobs`
        );
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    getJobs();
  }, []);

  // Handler for removing a job from the list
  const handleDelete = (id: string) => {
    setJobs((prev) => prev.filter((job) => job._id !== id));
  };

  // Handler for updating a job in the list
  const handleUpdate = (updatedJob: Job) => {
    setJobs((prev) =>
      prev.map((job) => (job._id === updatedJob._id ? updatedJob : job))
    );
  };

  return (
    <Box sx={{ margin: { md: "2rem 8rem", lg: "2rem 18rem" } }}>
      <Typography variant="h4">My Professional Experience</Typography>
      <Divider sx={{ margin: "1rem 0" }} />
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        Here are some of the job experiences I've had over the years.
      </Typography>
      {!isLoading && jobs.length === 0 && (
        <Typography variant="body1">No job experiences found.</Typography>
      )}
      {isLoading
        ? Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)
        : [...jobs]
            .sort(
              (a, b) =>
                new Date(b.startDate).getTime() -
                new Date(a.startDate).getTime()
            )
            .map((job) => (
              <WorkCard
                key={job._id}
                job={job}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
    </Box>
  );
};

export default WorkPage;
