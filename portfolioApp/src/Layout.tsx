import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import styles from "./app.styles";

export default function Layout() {
  return (
    <Box sx={styles.appLayout}>
      <Box sx={styles.appFillSpace}>
        <NavBar />
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
