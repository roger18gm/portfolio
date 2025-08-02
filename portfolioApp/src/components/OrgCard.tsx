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
import { Organization } from "../pages/HomePage";
import cardStyles from "./card.styles";
import { formatDate } from "../helpers";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import OrgForm from "./OrgForm";

interface OrgCardProps {
  org: Organization;
  onDelete: (id: string) => void;
  onUpdate: (org: Organization) => void;
}

const OrgCard = ({ org, onDelete, onUpdate }: OrgCardProps) => {
  const { isAuth } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <Card key={org._id} sx={cardStyles.cardBorder}>
      <CardActionArea sx={cardStyles.card}>
        <CardContent>
          <Typography variant="h6">{org.name}</Typography>
          <Typography variant="body1">
            Joined: {formatDate(org.joinDate)}
            {org.leaveDate && `, Left: ${formatDate(org.leaveDate)}`}
          </Typography>
          <Typography variant="body1">Type: {org.type}</Typography>
          <Typography variant="body1">Position: {org.position}</Typography>
          <Typography variant="body1">{org.details}</Typography>
          {isAuth && (
            <>
              <Button
                variant="outlined"
                sx={{ m: 1 }}
                onClick={() => setEditOpen(true)}
              >
                Edit Org
              </Button>
              <OrgForm
                open={editOpen}
                onClose={() => setEditOpen(false)}
                onUpdate={onUpdate}
                org={org}
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
              Delete Org
            </Button>
          )}

          <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
            <DialogTitle>Delete Org</DialogTitle>
            <DialogContent>
              <Typography variant="body1">
                Are you sure you want to delete this org?
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
                      `${import.meta.env.VITE_API_URL}/organizations/${
                        org._id
                      }`,
                      { withCredentials: true }
                    );
                    setDeleteOpen(false);
                    onDelete(org._id); // <-- update parent state
                  } catch (error) {
                    console.error("Error deleting org:", error);
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

export default OrgCard;
