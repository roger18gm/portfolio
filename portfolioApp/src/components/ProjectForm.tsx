import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import axios from "axios";
import { Project } from "../pages/ProjectsPage";

// interface Project {
//   _id?: string;
//   name: string;
//   type: string;
//   videoUrl: string;
//   sourceUrl: string;
//   details: string[];
//   stack: string[];
//   startDate?: string;
//   endDate?: string;
// }

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  onUpdate?: (project: Project) => void;
  project?: Project; // <-- optional for editing
}

const ProjectForm = ({
  open,
  onClose,
  onUpdate,
  project,
}: ProjectFormProps) => {
  const [name, setName] = useState(project?.name || "");
  const [type, setType] = useState(project?.type || "");
  const [videoUrl, setVideoUrl] = useState(project?.videoUrl || "");
  const [sourceUrl, setSourceUrl] = useState(project?.sourceUrl || "");
  const [techStack, setTechStack] = useState<string[]>(project?.stack || [""]);
  const [details, setDetails] = useState<string[]>(project?.details || [""]);
  const [startDate, setStartDate] = useState<Dayjs | null>(
    project?.startDate ? dayjs(project.startDate) : null
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(
    project?.endDate ? dayjs(project.endDate) : null
  );

  const handleTechStackChange = (idx: number, value: string) => {
    setTechStack((ts) => ts.map((item, i) => (i === idx ? value : item)));
  };
  const handleAddTechStack = () => setTechStack((ts) => [...ts, ""]);
  const handleRemoveTechStack = (idx: number) =>
    setTechStack((ts) => ts.filter((_, i) => i !== idx));

  const handleDetailsChange = (idx: number, value: string) => {
    setDetails((ds) => ds.map((item, i) => (i === idx ? value : item)));
  };
  const handleAddDetail = () => setDetails((ds) => [...ds, ""]);
  const handleRemoveDetail = (idx: number) =>
    setDetails((ds) => ds.filter((_, i) => i !== idx));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = {
        name,
        startDate: startDate ? startDate.format("YYYY-MM-DD") : null,
        endDate: endDate ? endDate.format("YYYY-MM-DD") : null,
        videoUrl,
        sourceUrl,
        type,
        details: details.filter(Boolean),
        stack: techStack.filter(Boolean),
      };
      if (project?._id) {
        // Update existing project
        const updatedProject = await axios.put<{
          message: string;
          project: Project;
        }>(
          `${import.meta.env.VITE_API_URL}/projects/${project._id}`,
          formData,
          { withCredentials: true }
        );
        console.log("Project updated:", updatedProject.data);
        onUpdate ? onUpdate(updatedProject.data.project) : null; // <-- update parent state
      } else {
        // Create new project
        await axios.post(`${import.meta.env.VITE_API_URL}/projects`, formData, {
          withCredentials: true,
        });
      }

      console.log("Form Data Submitted:", formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      onClose();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ m: 0, p: 2 }}>
            {project ? "Edit Project" : "Add Project"}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  margin="dense"
                  id="project-name"
                  label="Project Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  margin="dense"
                  id="project-type"
                  label="Project Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid size={6}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                  slotProps={{
                    textField: { fullWidth: true, margin: "dense" },
                  }}
                />
              </Grid>
              <Grid size={6}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                  slotProps={{
                    textField: { fullWidth: true, margin: "dense" },
                  }}
                />
              </Grid>

              <TextField
                margin="dense"
                id="video-url"
                label="Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                type="url"
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                id="source-url"
                label="Source URL"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                type="url"
                fullWidth
                variant="outlined"
              />
              <Grid size={12}>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">Details</Typography>
                  {details.map((detail, idx) => (
                    <Box
                      key={idx}
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <TextField
                        margin="dense"
                        label={`Detail ${idx + 1}`}
                        value={detail}
                        onChange={(e) =>
                          handleDetailsChange(idx, e.target.value)
                        }
                        fullWidth
                        variant="outlined"
                      />
                      <IconButton
                        aria-label="remove detail"
                        onClick={() => handleRemoveDetail(idx)}
                        disabled={details.length === 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    startIcon={<AddIcon />}
                    onClick={handleAddDetail}
                    size="small"
                    sx={{ mb: 2 }}
                  >
                    Add Detail
                  </Button>
                </Box>
              </Grid>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Tech Stack</Typography>
                {techStack.map((tech, idx) => (
                  <Box
                    key={idx}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <TextField
                      margin="dense"
                      label={`Tech ${idx + 1}`}
                      value={tech}
                      onChange={(e) =>
                        handleTechStackChange(idx, e.target.value)
                      }
                      fullWidth
                      variant="outlined"
                    />
                    <IconButton
                      aria-label="remove tech"
                      onClick={() => handleRemoveTechStack(idx)}
                      disabled={techStack.length === 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  startIcon={<AddIcon />}
                  onClick={handleAddTechStack}
                  size="small"
                  sx={{ mb: 2 }}
                >
                  Add Tech
                </Button>
              </Box>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ProjectForm;
