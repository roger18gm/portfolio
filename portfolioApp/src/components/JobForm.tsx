import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const JobForm = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>Add Job</DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          id="job-title"
          label="Job Title"
          type="text"
          fullWidth
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="job-details"
          label="job details"
          type="text"
          fullWidth
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="company-name"
          label="Company Name"
          type="text"
          fullWidth
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="location"
          label="Location"
          type="text"
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => handleSubmit}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobForm;
