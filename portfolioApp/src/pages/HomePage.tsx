import { Box, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Box>
      <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      >
        <Typography sx={{
          fontSize: {
            xs: '1.5rem',   // small screens
            sm: '1.5rem',
            md: '2rem', // medium screens and up
            lg: '2rem',
          },
          fontWeight: 'bold',}} 
          padding={1}>
          Roger Galan Manzano
        </Typography>
        <Typography sx={{
          fontSize: {
            xs: '1.25rem',   // small screens
            sm: '1.25rem',
            md: '2rem', // medium screens and up
            lg: '2rem',
          },
          fontWeight: 'bold',}} 
          padding={"0rem 1rem"}
         >
          Software Engineer
        </Typography>
        <img style={{maxWidth: "300px"}} src="/images/roger.galan.headshot.jpg" alt="picture of Roger Galan" />
        <Typography variant="body1" padding={3}>
          Thank you for visiting my virtual portfolio! Below you can learn about who I am, view my certification(s), and organizations that I am involved with.
          You can also navigate between my entire work history, projects that I've created/worked on with visual demonstrations, and fill out a form to get in contact with me via email. For each project, there will be a link to the source Github repository.
        </Typography>
        <Typography variant="body1" padding={3}>
          I'm currently studying at Brigham Young University-Idaho, majoring in Software Engineering, with emphases in Software Design, Full Stack Development, and Cloud Development.
          As I continue my Junior year, I've had various opportunities to work with my peers and develop complex and real-world applications through coursework and extracurricular activities.
          My drive comes from learning, diving into the unknown, challenging myself, and a strong focus to bring technical solutions to the common person. 
        </Typography>
      </Box>


    </Box>
  );
}

export default HomePage;
