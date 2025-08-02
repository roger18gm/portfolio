import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { Organization } from "../pages/HomePage";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

interface OrgFormProps {
  open: boolean;
  onClose: () => void;
  onUpdate?: (org: Organization) => void;
  org?: Organization; // <-- optional for editing
}

const OrgForm = ({ open, onClose, onUpdate, org }: OrgFormProps) => {
  const [name, setName] = useState(org?.name || "");
  const [type, setType] = useState(org?.type || "");
  const [position, setPosition] = useState(org?.position || "");
  const [details, setDetails] = useState<string>(org?.details || "");
  const [joinDate, setJoinDate] = useState<Dayjs | null>(
    org?.joinDate ? dayjs(org.joinDate) : null
  );
  const [leaveDate, setLeaveDate] = useState<Dayjs | null>(
    org?.leaveDate ? dayjs(org.leaveDate) : null
  );
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = {
        name,
        joinDate: joinDate ? joinDate.format("YYYY-MM-DD") : null,
        leaveDate: leaveDate ? leaveDate.format("YYYY-MM-DD") : null,
        position,
        type,
        details,
      };
      if (org?._id) {
        // Update existing org
        const updatedOrg = await axios.put<{
          message: string;
          organization: Organization;
        }>(
          `${import.meta.env.VITE_API_URL}/organizations/${org._id}`,
          formData,
          {
            withCredentials: true,
          }
        );
        console.log("Org updated:", updatedOrg.data);
        onUpdate ? onUpdate(updatedOrg.data.organization) : null; // <-- update parent state
      } else {
        // Create new org
        await axios.post(
          `${import.meta.env.VITE_API_URL}/organizations`,
          formData,
          {
            withCredentials: true,
          }
        );
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
          <DialogTitle sx={{ m: 0, p: 2 }}>Add Organization</DialogTitle>
          <DialogContent dividers>
            <TextField
              autoFocus
              margin="dense"
              id="organization-name"
              label="Organization Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              fullWidth
              variant="outlined"
            />
            <Grid container spacing={1}>
              <Grid size={6}>
                <DatePicker
                  label="Join Date"
                  value={joinDate}
                  onChange={setJoinDate}
                  slotProps={{
                    textField: { fullWidth: true, margin: "dense" },
                  }}
                />
              </Grid>
              <Grid size={6}>
                <DatePicker
                  label="Leave Date"
                  value={leaveDate}
                  onChange={setLeaveDate}
                  slotProps={{
                    textField: { fullWidth: true, margin: "dense" },
                  }}
                />
              </Grid>
            </Grid>
            <TextField
              margin="dense"
              id="organization-details"
              label="Organization Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="type-of-organization"
              label="Type of Organization"
              value={type}
              onChange={(e) => setType(e.target.value)}
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="position"
              label="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              type="text"
              fullWidth
              variant="outlined"
            />
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

export default OrgForm;
