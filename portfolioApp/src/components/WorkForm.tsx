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
import { Job } from "../pages/WorkPage";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

interface WorkFormProps {
  open: boolean;
  onClose: () => void;
  onUpdate?: (job: Job) => void;
  job?: Job; // <-- optional for editing
}

const WorkForm = ({ open, onClose, onUpdate, job }: WorkFormProps) => {
  const [title, setTitle] = useState(job?.title || "");
  const [company, setCompany] = useState(job?.company || "");
  const [location, setLocation] = useState(job?.location || "");
  const [details, setDetails] = useState<string[]>(job?.details || [""]);
  const [startDate, setStartDate] = useState<Dayjs | null>(
    job?.startDate ? dayjs(job.startDate) : null
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(
    job?.endDate ? dayjs(job.endDate) : null
  );

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
        title,
        startDate: startDate ? startDate.format("YYYY-MM-DD") : null,
        endDate: endDate ? endDate.format("YYYY-MM-DD") : null,
        company,
        location,
        details: details.filter(Boolean),
      };
      if (job?._id) {
        // Update existing job
        const updatedJob = await axios.put<{
          message: string;
          job: Job;
        }>(`${import.meta.env.VITE_API_URL}/jobs/${job._id}`, formData, {
          withCredentials: true,
        });
        console.log("Job updated:", updatedJob.data);
        onUpdate ? onUpdate(updatedJob.data.job) : null; // <-- update parent state
      } else {
        // Create new job
        await axios.post(`${import.meta.env.VITE_API_URL}/jobs`, formData, {
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
            {job ? "Edit Job" : "Add Job"}
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              autoFocus
              margin="dense"
              id="job-title"
              label="Job Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              fullWidth
              variant="outlined"
            />
            <Grid container spacing={1}>
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
            </Grid>
            <TextField
              margin="dense"
              id="company-name"
              label="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="location"
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              fullWidth
              variant="outlined"
            />
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
                    onChange={(e) => handleDetailsChange(idx, e.target.value)}
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

export default WorkForm;
