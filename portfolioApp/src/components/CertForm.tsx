import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { Certification } from "../pages/HomePage";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";

interface CertFormProps {
  open: boolean;
  onClose: () => void;
  onUpdate?: (cert: Certification) => void;
  cert?: Certification; // <-- optional for editing
}

const CertForm = ({ open, onClose, onUpdate, cert }: CertFormProps) => {
  const [name, setName] = useState(cert?.name || "");
  const [issuingOrg, setIssuingOrg] = useState(cert?.issuingOrganization || "");
  const [verificationUrl, setVerificationUrl] = useState(
    cert?.verificationUrl || ""
  );
  const [details, setDetails] = useState<string>(cert?.details || "");
  const [issueDate, setIssueDate] = useState<Dayjs | null>(
    cert?.issueDate ? dayjs(cert.issueDate) : null
  );
  const [expireDate, setExpireDate] = useState<Dayjs | null>(
    cert?.expireDate ? dayjs(cert.expireDate) : null
  );
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = {
        name,
        issueDate: issueDate ? issueDate.format("YYYY-MM-DD") : null,
        expireDate: expireDate ? expireDate.format("YYYY-MM-DD") : null,
        issuingOrganization: issuingOrg,
        verificationUrl,
        location,
        details,
      };
      if (cert?._id) {
        // Update existing cert
        const updatedCert = await axios.put<{
          message: string;
          certification: Certification;
        }>(
          `${import.meta.env.VITE_API_URL}/certifications/${cert._id}`,
          formData,
          {
            withCredentials: true,
          }
        );
        console.log("Cert updated:", updatedCert.data);
        onUpdate ? onUpdate(updatedCert.data.certification) : null; // <-- update parent state
      } else {
        // Create new cert
        await axios.post(
          `${import.meta.env.VITE_API_URL}/certifications`,
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
          <DialogTitle sx={{ m: 0, p: 2 }}>
            {cert ? "Edit Cert" : "Add Cert"}
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              autoFocus
              margin="dense"
              id="certification-name"
              label="Certification Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              fullWidth
              variant="outlined"
            />
            <Grid container spacing={1}>
              <Grid size={6}>
                <DatePicker
                  label="Issue Date"
                  value={issueDate}
                  onChange={setIssueDate}
                  slotProps={{
                    textField: { fullWidth: true, margin: "dense" },
                  }}
                />
              </Grid>
              <Grid size={6}>
                <DatePicker
                  label="Expire Date"
                  value={expireDate}
                  onChange={setExpireDate}
                  slotProps={{
                    textField: { fullWidth: true, margin: "dense" },
                  }}
                />
              </Grid>
            </Grid>
            <TextField
              margin="dense"
              id="certification-details"
              label="Certification Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="verification-url"
              label="Verification URL"
              value={verificationUrl}
              onChange={(e) => setVerificationUrl(e.target.value)}
              type="url"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="issuing-organization"
              label="Issuing Organization"
              value={issuingOrg}
              onChange={(e) => setIssuingOrg(e.target.value)}
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

export default CertForm;
