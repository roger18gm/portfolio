import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./home.styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CertCard from "../components/CertCard";
import OrgCard from "../components/OrgCard";
import SkeletonCard from "../components/SkeletonCard";

export interface Certification {
  _id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expireDate?: string;
  verificationUrl?: string;
  details: string;
}

export interface Organization {
  _id: string;
  name: string;
  joinDate: string;
  leaveDate?: string;
  type: string;
  position: string;
  details: string;
}

const HomePage = () => {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loadingCerts, setLoadingCerts] = useState(true);
  const [loadingOrgs, setLoadingOrgs] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/certifications`
        );
        const data = await response.json();
        setCerts(data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      } finally {
        setLoadingCerts(false);
      }
    };

    const fetchOrganizations = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/organizations`
        );
        const data = await response.json();
        setOrgs(data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      } finally {
        setLoadingOrgs(false);
      }
    };

    fetchCertifications();
    fetchOrganizations();
  }, []);

  // Handler for removing a cert from the list
  const handleDeleteCert = (id: string) => {
    setCerts((prev) => prev.filter((cert) => cert._id !== id));
  };

  // Handler for updating a cert in the list
  const handleUpdateCert = (updatedCert: Certification) => {
    setCerts((prev) =>
      prev.map((cert) => (cert._id === updatedCert._id ? updatedCert : cert))
    );
  };

  const handleDeleteOrg = (id: string) => {
    setOrgs((prev) => prev.filter((org) => org._id !== id));
  };
  const handleUpdateOrg = (updatedOrg: Organization) => {
    setOrgs((prev) =>
      prev.map((org) => (org._id === updatedOrg._id ? updatedOrg : org))
    );
  };

  return (
    <Box>
      <Box sx={styles.container}>
        <Typography sx={styles.nameText}>Roger Galan Manzano</Typography>
        <Typography sx={styles.title}>Software Engineer</Typography>
        <img
          style={{ maxWidth: "300px" }}
          src="/images/roger.galan.headshot-min.jpg"
          alt="picture of Roger Galan"
        />
        <Paper elevation={10} sx={styles.bioSection}>
          <Typography sx={styles.bioText} variant="body1">
            I'm a software engineering student driven by the challenge of
            translating complex ideas into elegant and user-centric
            applications. My goal is to leverage technology to create solutions
            that are both powerful and accessible to everyone.
          </Typography>
          <Typography sx={styles.bioText} variant="body1">
            As a junior at BYU-Idaho with emphases in Software Design, Full
            Stack, and Cloud Development, I've honed my skills by building
            robust applications in collaborative, fast-paced environments. From
            designing the user interface with <b>Figma</b> and <b>React</b> to
            deploying the back-end on <b>AWS</b> or <b>GCP</b>, I enjoy every
            stage of the development lifecycle.
          </Typography>
          <Typography sx={styles.bioText} variant="body1">
            This portfolio is a collection of my work. I invite you to explore
            my projects to see my passion for clean code and problem-solving in
            action. You can find detailed demonstrations of my work in the
            projects section, my full experience on my resume, and my code on
            GitHub.
          </Typography>
        </Paper>
      </Box>

      <Box sx={styles.accordionSection}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h4" component="span">
              Background
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              In my youth, I was captivated by the world of technology, often
              wondering how my family computer and PlayStation console worked.
              This curiosity led me to explore programming, starting with HTML
              and CSS in high school. I quickly fell in love with the process of
              creating something from nothing, and I knew I wanted to pursue a
              career in software development.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography variant="h4" component="span">
              Career Goals
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              My career objective is to become a proficient software engineer
              who can design and implement innovative solutions that enhance
              user experiences and drive business success. I aim to work in a
              dynamic environment where I can continue to learn, grow, and
              contribute to impactful projects. I want to do more than just
              write code, I want to be part of a team that creates products that
              make a difference in people's lives.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box sx={styles.bottomSection}>
        <Box sx={{ marginBottom: "2rem" }}>
          <Typography variant="h4">Certifications</Typography>
          <Divider sx={{ margin: "1rem 0" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {loadingCerts
              ? Array.from({ length: 2 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : certs.map((cert) => (
                  <CertCard
                    key={cert._id}
                    cert={cert}
                    onDelete={handleDeleteCert}
                    onUpdate={handleUpdateCert}
                  />
                ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="h4">Organizations</Typography>
          <Divider sx={{ margin: "1rem 0" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {loadingOrgs
              ? Array.from({ length: 2 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : orgs.map((org) => (
                  <OrgCard
                    key={org._id}
                    org={org}
                    onDelete={handleDeleteOrg}
                    onUpdate={handleUpdateOrg}
                  />
                ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
