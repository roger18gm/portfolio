import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { formatDate } from "../helpers";
import styles from "./home.styles";
import cardStyles from "../components/card.styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Certification = {
  _id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expireDate?: string;
  verificationUrl?: string;
  details: string;
};

type Organization = {
  _id: string;
  name: string;
  joinDate: string;
  leaveDate?: string;
  type: string;
  position: string;
  details: string;
};

const HomePage = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/certifications`
        );
        const data = await response.json();
        setCertifications(data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    };

    const fetchOrganizations = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/organizations`
        );
        const data = await response.json();
        setOrganizations(data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchCertifications();
    fetchOrganizations();
  }, []);

  return (
    <Box>
      <Box sx={styles.container}>
        <Typography sx={styles.nameText}>Roger Galan Manzano</Typography>
        <Typography sx={styles.title}>Software Engineer</Typography>
        <img
          style={{ maxWidth: "300px" }}
          src="/images/roger.galan.headshot.jpg"
          alt="picture of Roger Galan"
        />
        <Paper elevation={10} sx={styles.bioSection}>
          <Typography sx={styles.bioText} variant="body1">
            Thank you for visiting my virtual portfolio! Below you can learn
            about who I am, view my certification(s), and organizations that I
            am involved with. You can also navigate between my entire work
            history, projects that I've created/worked on with visual
            demonstrations, and fill out a form to get in contact with me via
            email. For each project, there will be a link to the source Github
            repository.
          </Typography>
          <Typography sx={styles.bioText} variant="body1">
            I'm currently studying at Brigham Young University-Idaho, majoring
            in Software Engineering, with emphases in Software Design, Full
            Stack Development, and Cloud Development. As I continue my Junior
            year, I've had various opportunities to work with my peers and
            develop complex and real-world applications through coursework and
            extracurricular activities. My drive comes from learning, diving
            into the unknown, challenging myself, and a strong focus to bring
            technical solutions to the common person.
          </Typography>
        </Paper>
      </Box>

      <Box sx={styles.bioSection}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">My Background</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">My Career Objectives</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box sx={styles.bottomSection}>
        <Box>
          <Typography sx={styles.nameText} variant="h4">
            Certifications
          </Typography>
          <Divider sx={{ margin: "1rem 0" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {certifications.map((cert) => (
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
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="h4">Organizations</Typography>
          <Divider sx={{ margin: "1rem 0" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {organizations.map((org) => (
              <Card key={org._id} sx={cardStyles.cardBorder}>
                <CardActionArea sx={cardStyles.card}>
                  <CardContent>
                    <Typography variant="h6">{org.name}</Typography>
                    <Typography variant="body1">
                      Joined: {formatDate(org.joinDate)}
                      {org.leaveDate && `, Left: ${formatDate(org.leaveDate)}`}
                    </Typography>
                    <Typography variant="body1">Type: {org.type}</Typography>
                    <Typography variant="body1">
                      Position: {org.position}
                    </Typography>
                    <Typography variant="body1">{org.details}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
