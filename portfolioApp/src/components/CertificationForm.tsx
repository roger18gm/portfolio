import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const CertificationForm = ({
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
      <DialogTitle sx={{ m: 0, p: 2 }}>Add Job</DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          id="certification-name"
          label="Certification Name"
          type="text"
          fullWidth
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="certification-details"
          label="Certification Details"
          type="text"
          fullWidth
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="verification-url"
          label="Verification URL"
          type="url"
          fullWidth
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="issuing-organization"
          label="Issuing Organization"
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

export default CertificationForm;
