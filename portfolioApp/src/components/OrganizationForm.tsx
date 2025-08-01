import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const OrganizationForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>Add Organization</DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          id="organization-name"
          label="Organization Name"
          type="text"
          fullWidth
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="organization-details"
          label="Organization Details"
          type="text"
          fullWidth
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="type-of-organization"
          label="Type of Organization"
          type="text"
          fullWidth
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="position"
          label="Position"
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

export default OrganizationForm;
