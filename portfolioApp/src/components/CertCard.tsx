import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Certification } from "../pages/HomePage";
import cardStyles from "./card.styles";
import { formatDate } from "../helpers";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import CertForm from "./CertForm";
import axios from "axios";

interface CertCardProps {
  cert: Certification;
  onDelete: (id: string) => void;
  onUpdate: (cert: Certification) => void;
}

const CertCard = ({ cert, onDelete, onUpdate }: CertCardProps) => {
  const { isAuth } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <Card key={cert._id} sx={cardStyles.cardBorder}>
      <CardActionArea sx={cardStyles.card}>
        <CardContent>
          <Typography variant="h6">{cert.name}</Typography>
          <Typography variant="body1">
            Issued by: {cert.issuingOrganization} on{" "}
            {formatDate(cert.issueDate)}
          </Typography>
          {cert.expireDate && (
            <Typography variant="body1">
              Expires on: {formatDate(cert.expireDate)}
            </Typography>
          )}
          {cert.verificationUrl && (
            <Typography variant="body1">
              Verification URL:{" "}
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {cert.verificationUrl}
              </a>
            </Typography>
          )}
          <Typography variant="body1">{cert.details}</Typography>

          {isAuth && (
            <>
              <Button
                variant="outlined"
                sx={{ m: 1 }}
                onClick={() => setEditOpen(true)}
              >
                Edit Certification
              </Button>
              <CertForm
                open={editOpen}
                onClose={() => setEditOpen(false)}
                onUpdate={onUpdate}
                cert={cert}
              />
            </>
          )}
          {isAuth && (
            <Button
              variant="outlined"
              color="error"
              sx={{ m: 1 }}
              onClick={() => setDeleteOpen(true)}
            >
              Delete Certification
            </Button>
          )}

          <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
            <DialogTitle>Delete Certification</DialogTitle>
            <DialogContent>
              <Typography variant="body1">
                Are you sure you want to delete this certification?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteOpen(false)} color="primary">
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  try {
                    await axios.delete(
                      `${import.meta.env.VITE_API_URL}/certifications/${
                        cert._id
                      }`,
                      { withCredentials: true }
                    );
                    setDeleteOpen(false);
                    onDelete(cert._id); // <-- update parent state
                  } catch (error) {
                    console.error("Error deleting cert:", error);
                  }
                }}
                color="secondary"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CertCard;
