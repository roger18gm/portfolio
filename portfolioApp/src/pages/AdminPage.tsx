import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import ProjectForm from "../components/ProjectForm";
import WorkForm from "../components/WorkForm";
import CertForm from "../components/CertForm";
import OrgForm from "../components/OrgForm";

type ModalType = "project" | "job" | "certification" | "organization" | null;

const AdminPage = () => {
  const [openModal, setOpenModal] = useState<ModalType>(null);

  const handleOpen = (type: ModalType) => setOpenModal(type);
  const handleClose = () => setOpenModal(null);

  return (
    <Box sx={{ textAlign: "center", padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Admin Page
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => handleOpen("project")}
        >
          Add New Project
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => handleOpen("job")}
        >
          Add New Job
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => handleOpen("certification")}
        >
          Add New Certification
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => handleOpen("organization")}
        >
          Add New Organization
        </Button>
      </Box>

      {openModal === "project" && (
        <ProjectForm open={true} onClose={handleClose} />
      )}
      {openModal === "job" && <WorkForm open={true} onClose={handleClose} />}
      {openModal === "certification" && (
        <CertForm open={true} onClose={handleClose} />
      )}
      {openModal === "organization" && (
        <OrgForm open={true} onClose={handleClose} />
      )}
    </Box>
  );
};

export default AdminPage;
