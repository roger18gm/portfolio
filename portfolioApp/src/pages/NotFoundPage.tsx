import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <Box sx={{ textAlign: "center", mt: 8 }}>
    <Typography variant="h2" gutterBottom>
      404
    </Typography>
    <Typography variant="h5" gutterBottom>
      Page Not Found
    </Typography>
    <Button variant="contained" component={Link} to="/">
      Go Home
    </Button>
  </Box>
);

export default NotFoundPage;
